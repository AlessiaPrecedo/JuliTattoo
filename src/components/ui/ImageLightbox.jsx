import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

function getTouchDistance(touches) {
  const [firstTouch, secondTouch] = touches;
  const deltaX = firstTouch.clientX - secondTouch.clientX;
  const deltaY = firstTouch.clientY - secondTouch.clientY;

  return Math.hypot(deltaX, deltaY);
}

function getImageData(image, index) {
  if (typeof image === "string") {
    return {
      src: image,
      alt: `Imagen ${index + 1}`,
    };
  }

  return {
    src: image.src,
    alt: image.alt || `Imagen ${index + 1}`,
  };
}

export default function ImageLightbox({ images, selectedIndex, setSelectedIndex }) {
  const [zoomScale, setZoomScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const touchStartRef = useRef(null);
  const panStartRef = useRef(null);
  const pinchRef = useRef(null);
  const didPanRef = useRef(false);
  const isOpen = selectedIndex !== null;
  const currentImage = isOpen ? getImageData(images[selectedIndex], selectedIndex) : null;

  const clampPan = useCallback(
    (nextPan, scale = zoomScale) => {
      const image = imageRef.current;
      if (!image || scale <= 1.05) return { x: 0, y: 0 };

      const maxX = (image.offsetWidth * (scale - 1)) / 2;
      const maxY = (image.offsetHeight * (scale - 1)) / 2;

      return {
        x: Math.max(-maxX, Math.min(maxX, nextPan.x)),
        y: Math.max(-maxY, Math.min(maxY, nextPan.y)),
      };
    },
    [zoomScale],
  );

  const resetZoom = useCallback(() => {
    setZoomScale(1);
    setPan({ x: 0, y: 0 });
    pinchRef.current = null;
    panStartRef.current = null;
    didPanRef.current = false;
  }, []);

  const closeLightbox = useCallback(() => {
    resetZoom();
    setSelectedIndex(null);
  }, [resetZoom, setSelectedIndex]);

  const goToPrev = useCallback(() => {
    resetZoom();
    setSelectedIndex((index) => (index - 1 + images.length) % images.length);
  }, [images.length, resetZoom, setSelectedIndex]);

  const goToNext = useCallback(() => {
    resetZoom();
    setSelectedIndex((index) => (index + 1) % images.length);
  }, [images.length, resetZoom, setSelectedIndex]);

  const handlePrevClick = (event) => {
    event.stopPropagation();
    goToPrev();
  };

  const handleNextClick = (event) => {
    event.stopPropagation();
    goToNext();
  };

  const toggleZoom = (event) => {
    event.stopPropagation();
    setZoomScale((scale) => {
      const nextScale = scale > 1 ? 1 : 2;
      if (nextScale === 1) setPan({ x: 0, y: 0 });
      return nextScale;
    });
  };

  const handleImageClick = (event) => {
    if (didPanRef.current) {
      event.stopPropagation();
      didPanRef.current = false;
      return;
    }

    toggleZoom(event);
  };

  const handleTouchStart = (event) => {
    if (event.touches.length === 2) {
      pinchRef.current = {
        distance: getTouchDistance(event.touches),
        scale: zoomScale,
      };
      panStartRef.current = null;
      return;
    }

    const touch = event.touches[0];

    if (zoomScale > 1.05) {
      panStartRef.current = {
        type: "touch",
        x: touch.clientX,
        y: touch.clientY,
        pan,
      };
      touchStartRef.current = null;
      didPanRef.current = false;
      return;
    }

    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: event.timeStamp,
    };
  };

  const handleTouchMove = (event) => {
    if (
      event.touches.length === 1 &&
      panStartRef.current?.type === "touch" &&
      zoomScale > 1.05
    ) {
      event.preventDefault();

      const touch = event.touches[0];
      const deltaX = touch.clientX - panStartRef.current.x;
      const deltaY = touch.clientY - panStartRef.current.y;

      if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
        didPanRef.current = true;
      }

      setPan(
        clampPan(
          {
            x: panStartRef.current.pan.x + deltaX,
            y: panStartRef.current.pan.y + deltaY,
          },
          zoomScale,
        ),
      );
      return;
    }

    if (event.touches.length !== 2 || !pinchRef.current) return;

    event.preventDefault();

    const nextScale =
      (getTouchDistance(event.touches) / pinchRef.current.distance) *
      pinchRef.current.scale;
    const clampedScale = Math.min(3, Math.max(1, nextScale));

    setZoomScale(clampedScale);
    setPan((currentPan) => clampPan(currentPan, clampedScale));
  };

  const handleTouchEnd = (event) => {
    if (panStartRef.current?.type === "touch") {
      if (event.touches.length === 0) {
        panStartRef.current = null;
      }
      return;
    }

    if (event.touches.length > 0 || pinchRef.current) {
      if (event.touches.length < 2) {
        pinchRef.current = null;
      }
      return;
    }

    if (!touchStartRef.current || zoomScale > 1.05) return;

    const changedTouch = event.changedTouches[0];
    const deltaX = changedTouch.clientX - touchStartRef.current.x;
    const deltaY = changedTouch.clientY - touchStartRef.current.y;
    const elapsed = event.timeStamp - touchStartRef.current.time;
    const isHorizontalSwipe = Math.abs(deltaX) > 48 && Math.abs(deltaY) < 80;

    touchStartRef.current = null;

    if (!isHorizontalSwipe || elapsed > 650) return;
    if (deltaX > 0) goToPrev();
    if (deltaX < 0) goToNext();
  };

  const handleImageMouseDown = (event) => {
    if (event.button !== 0 || zoomScale <= 1.05) return;

    event.preventDefault();
    event.stopPropagation();

    panStartRef.current = {
      type: "mouse",
      x: event.clientX,
      y: event.clientY,
      pan,
    };
    didPanRef.current = false;
  };

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") goToPrev();
      if (event.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeLightbox, goToNext, goToPrev, isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleMouseMove = (event) => {
      if (panStartRef.current?.type !== "mouse" || zoomScale <= 1.05) return;

      const deltaX = event.clientX - panStartRef.current.x;
      const deltaY = event.clientY - panStartRef.current.y;

      if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
        didPanRef.current = true;
      }

      setPan(
        clampPan(
          {
            x: panStartRef.current.pan.x + deltaX,
            y: panStartRef.current.pan.y + deltaY,
          },
          zoomScale,
        ),
      );
    };

    const handleMouseUp = () => {
      if (panStartRef.current?.type === "mouse") {
        panStartRef.current = null;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [clampPan, isOpen, zoomScale]);

  if (!isOpen || !currentImage) return null;

  return createPortal(
    <div
      className="lightbox"
      onClick={closeLightbox}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button
        type="button"
        className="lightbox__close"
        onClick={closeLightbox}
        aria-label="Cerrar imagen"
      >
        x
      </button>

      <button
        type="button"
        className="lightbox__arrow lightbox__arrow--prev"
        onClick={handlePrevClick}
        aria-label="Imagen anterior"
      >
        {"<"}
      </button>

      <div
        className={
          zoomScale > 1.05
            ? "lightbox__img-wrap lightbox__img-wrap--pannable"
            : "lightbox__img-wrap"
        }
        onClick={(event) => event.stopPropagation()}
      >
        <img
          ref={imageRef}
          className="lightbox__img"
          src={currentImage.src}
          alt={currentImage.alt}
          draggable="false"
          onMouseDown={handleImageMouseDown}
          onClick={handleImageClick}
          onDoubleClick={toggleZoom}
          style={{
            transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoomScale})`,
          }}
        />
        <span className="lightbox__counter">
          {selectedIndex + 1} / {images.length}
        </span>
      </div>

      <button
        type="button"
        className="lightbox__arrow lightbox__arrow--next"
        onClick={handleNextClick}
        aria-label="Imagen siguiente"
      >
        {">"}
      </button>
    </div>,
    document.body,
  );
}
