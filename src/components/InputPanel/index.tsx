// src/components/InputPanel.tsx
import React, { FormEvent, useState } from "react";
import style from "./index.module.css";

interface Props {
  addPage: (page: {
    title: string;
    buttons: string[];
    textFields: string[];
    labels: string[];
    checkboxs: string[];
    textAreas: string[];
    images: string[];
  }) => void;
  config: {
    model: string;
    setModel: (value: string) => void;
    width: number;
    setWidht: (value: number) => void;
    height: number;
    setHeight: (value: number) => void;
    orientation: string;
    setOrientation: (value: string) => void;
  };
}

const InputPanel: React.FC<Props> = ({ addPage, config }) => {
  const [pageTitle, setPageTitle] = useState<string>("");
  const [buttonCount, setButtonCount] = useState<number>(0);
  const [textFieldCount, setTextFieldCount] = useState<number>(0);
  const [labelCount, setLabelCount] = useState<number>(0);
  const [checkBoxCount, setCheckBoxCount] = useState<number>(0);
  const [textAreaCount, setTextAreaCount] = useState<number>(0);
  const [imageCount, setImageCount] = useState<number>(0);

  const handleAddPage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addPage({
      title: pageTitle,
      buttons: Array.from({ length: buttonCount }, () => `buttonWithLabel`),
      textFields: Array.from({ length: textFieldCount }, () => `TextField`),
      labels: Array.from({ length: labelCount }, () => `Label`),
      checkboxs: Array.from({ length: checkBoxCount }, () => `CheckBox`),
      images: Array.from({ length: imageCount }, () => `Image`),
      textAreas: Array.from({ length: textAreaCount }, () => `TextArea`),
    });
    setPageTitle("");
    setButtonCount(0);
    setTextFieldCount(0);
    setLabelCount(0);
    setCheckBoxCount(0);
    setTextAreaCount(0);
    setImageCount(0);
  };

  return (
    <div className={style.input_panel}>
      <h3>Configurações Gerais</h3>
      <form onSubmit={handleAddPage}>
        <div className={style.model_ihm}>
          <label>Modelo da IHM:</label>
          <input
            value={config.model}
            onChange={(e) => config.setModel(e.target.value)}
            type="text"
            placeholder="Modelo da IHM"
          />

          <label>Largura:</label>
          <input
            value={config.width}
            onChange={(e) => config.setWidht(Number(e.target.value))}
            type="number"
            placeholder="Largura"
          />

          <label>Altura:</label>
          <input
            value={config.height}
            onChange={(e) => config.setHeight(Number(e.target.value))}
            type="number"
            placeholder="Altura"
          />

          <label>Orientação:</label>
          <select
            value={config.orientation}
            onChange={(e) => {
              config.setOrientation(e.target.value);
            }}
          >
            <option value="Portrait">Portrait</option>
            <option value="Landscape">Landscape</option>
          </select>
        </div>

        <h3>Configurações da Página</h3>
        <div className={style.config_page}>
          <label>Título da Página:</label>
          <input
            type="text"
            value={pageTitle}
            onChange={(e) => setPageTitle(e.target.value)}
            placeholder="Título da Página"
          />
          <label>Número de Botões:</label>
          <input
            type="number"
            value={buttonCount}
            min={0}
            max={5}
            onChange={(e) => setButtonCount(Number(e.target.value))}
            placeholder="Número de Botões"
          />
          <label>Número de TextFields:</label>
          <input
            type="number"
            value={textFieldCount}
            min={0}
            max={5}
            onChange={(e) => setTextFieldCount(Number(e.target.value))}
            placeholder="Número de TextFields"
          />
          <label>Número de Labels:</label>
          <input
            type="number"
            value={labelCount}
            min={0}
            max={5}
            onChange={(e) => setLabelCount(Number(e.target.value))}
            placeholder="Número de labels"
          />

          <label>Número de Checkbox:</label>
          <input
            type="number"
            value={checkBoxCount}
            min={0}
            max={5}
            onChange={(e) => setCheckBoxCount(Number(e.target.value))}
            placeholder="Número de checkbox"
          />
          <label>Número de TextArea:</label>
          <input
            type="number"
            value={textAreaCount}
            min={0}
            max={5}
            onChange={(e) => setTextAreaCount(Number(e.target.value))}
            placeholder="Número de TextArea"
          />
          <label>Número de Imagens:</label>
          <input
            type="number"
            value={imageCount}
            min={0}
            max={5}
            onChange={(e) => setImageCount(Number(e.target.value))}
            placeholder="Número de Images"
          />
        </div>
        <button
          className={style.button_add_page}
          disabled={!pageTitle}
          type="submit"
        >
          Adicionar Página
        </button>
      </form>
    </div>
  );
};

export default InputPanel;
