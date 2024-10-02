import "./App.css";
import { useCallback, useEffect, useRef } from "react";
import Section from "./components/Section";
import Footer from "./components/Footer";

function App() {
  const draggedElement = useRef(null);
  const sourceContainer = useRef(null);

  const $ = (el) => document.querySelector(el);
  const $$ = (el) => document.querySelectorAll(el);

  var itemsSection = null;
  var resetButton = null;
  var saveButton = null;

  useEffect(() => {
    itemsSection = $("#selector-items");
    resetButton = $("#reset-tier-button");
    saveButton = $("#save-tier-button");
    addEventListeners();
  }, []);

  const createItem = (src) => {
    const imgElement = document.createElement("img");
    imgElement.draggable = true;
    imgElement.src = src;
    imgElement.className = "item-image";
    imgElement.addEventListener("dragstart", handleDragStart);
    imgElement.addEventListener("dragend", handleDragEnd);
    itemsSection.appendChild(imgElement);

    return imgElement;
  };

  const handleDragStart = useCallback((event) => {
    draggedElement.current = event.target;
    sourceContainer.current = event.target.parentElement;
    event.dataTransfer.setData("text/plain", draggedElement.current.src);
    event.dataTransfer.setData("application/my-app-item", "true");
  }, []);

  const handleDragEnd = (event) => {
    draggedElement.current = null;
    sourceContainer.current = null;
  };

  const addEventListeners = () => {
    const rows = $$(".tier .row");
    rows.forEach((row) => {
      row.addEventListener("dragover", handleDragOver);
      row.addEventListener("drop", handleDrop);
      row.addEventListener("dragleave", handleDragLeave);
    });
    itemsSection.addEventListener("dragover", handleDragOver);
    itemsSection.addEventListener("drop", handleDrop);
    itemsSection.addEventListener("dragleave", handleDragLeave);

    itemsSection.addEventListener("dragover", handleDragOverFromDesktop);
    itemsSection.addEventListener("drop", handleDropFromDesktop);

    resetButton.addEventListener("click", () => {
      const items = $$(".tier .item-image");
      items.forEach((item) => {
        item.remove();
        itemsSection.appendChild(item);
      });
    });

    saveButton.addEventListener("click", () => {
      const tierContainer = $(".tier");
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      import(
        "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.esm.min.js"
      ).then(({ default: html2canvas }) => {
        html2canvas(tierContainer).then((canvas) => {
          ctx.drawImage(canvas, 0, 0);
          const imgURL = canvas.toDataURL("image/png");
          const downloadLink = document.createElement("a");
          downloadLink.download = "tier.png";
          downloadLink.href = imgURL;
          downloadLink.click();
        });
      });
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const { currentTarget, dataTransfer } = e;

    if (sourceContainer && draggedElement) {
      sourceContainer.current.removeChild(draggedElement.current);
    }

    if (draggedElement) {
      const src = dataTransfer.getData("text/plain");
      const imgElement = createItem(src);
      currentTarget.appendChild(imgElement);
    }
    currentTarget.classList.remove("drag-over");
    currentTarget.querySelector(".drag-preview")?.remove();
  };

  const handleDragOver = (e) => {
    e.preventDefault();

    const { currentTarget, dataTransfer } = e;

    if (sourceContainer.current === currentTarget) {
      return;
    }

    currentTarget.classList.add("drag-over");

    const dragPreview = $(".drag-preview");

    if (draggedElement.current && !dragPreview) {
      const previewElement = draggedElement.current.cloneNode(true);
      previewElement.classList.add("drag-preview");
      currentTarget.appendChild(previewElement);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    const { currentTarget } = e;

    currentTarget.classList.remove("drag-over");
    currentTarget.querySelector(".drag-preview")?.remove();
  };

  const handleDragOverFromDesktop = (e) => {
    e.preventDefault();

    const { currentTarget, dataTransfer } = e;

    if (sourceContainer.current === currentTarget) {
      return;
    }

    if (!dataTransfer.types.includes("application/my-app-item")) {
      currentTarget.classList.add("drag-files");
    }
  };

  const handleDropFromDesktop = (e) => {
    e.preventDefault();

    const { currentTarget, dataTransfer } = e;

    if (!dataTransfer.types.includes("application/my-app-item")) {
      currentTarget.classList.remove("drag-files");
      const { files } = dataTransfer;
      useFilesToCreateItems(files);
    }
  };

  const useFilesToCreateItems = (files) => {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (eventReader) => {
        createItem(eventReader.target.result);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <header id="top-header">
        <img src="https://tiermaker.com/images/tiermaker-logo.png" alt="" />
      </header>
      <Section />
      <Footer useFilesToCreateItems={useFilesToCreateItems} />
    </>
  );
}

export default App;
