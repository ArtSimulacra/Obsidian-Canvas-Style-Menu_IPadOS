import { App, Plugin, Editor, SuggestModal } from 'obsidian';

// Улучшили интерфейс: теперь храним размер и стиль отдельно
interface SizeOption {
    label: string;
    size: string | null;
    isBold: boolean;
}

class SizeSuggestModal extends SuggestModal<SizeOption> {
    editor: Editor;

    constructor(app: App, editor: Editor) {
        super(app);
        this.editor = editor;
        this.setPlaceholder("Выберите размер и стиль текста");
    }

    getSuggestions(query: string): SizeOption[] {
        const options: SizeOption[] = [
            { label: "❌ Очистить форматирование", size: null, isBold: false },
            { label: "10 px", size: "10", isBold: false },
            { label: "10 px (Жирный)", size: "10", isBold: true },
            { label: "20 px", size: "20", isBold: false },
            { label: "20 px (Жирный)", size: "20", isBold: true },
            { label: "30 px", size: "30", isBold: false },
            { label: "30 px (Жирный)", size: "30", isBold: true },
            { label: "40 px", size: "40", isBold: false },
            { label: "40 px (Жирный)", size: "40", isBold: true },
            { label: "50 px", size: "50", isBold: false },
            { label: "50 px (Жирный)", size: "50", isBold: true },
            { label: "60 px", size: "60", isBold: false },
            { label: "60 px (Жирный)", size: "60", isBold: true }
        ];
        return options.filter(o => o.label.toLowerCase().includes(query.toLowerCase()));
    }

    // Красивая отрисовка в меню: жирные пункты показываем жирным!
    renderSuggestion(option: SizeOption, el: HTMLElement) {
        const div = el.createEl("div", { text: option.label });
        if (option.isBold) {
            div.style.fontWeight = "bold";
        }
    }

    onChooseSuggestion(option: SizeOption, evt: MouseEvent | KeyboardEvent) {
        const selection = this.editor.getSelection();
        
        // Регулярку тоже сделал чуть умнее: теперь она чистит ЛЮБЫЕ наши спаны со стилями
        const cleanText = selection
            .replace(/<span style="[^>]*">/g, "")
            .replace(/<\/span>/g, "");
        
        if (option.size === null) {
            this.editor.replaceSelection(cleanText);
        } else {
            // Формируем строчку с font-weight, если нужно
            const boldStyle = option.isBold ? " font-weight: bold;" : "";
            
            // Собираем финальный тег (с твоим inline-block)
            const styleString = `font-size: ${option.size}px; line-height: 1.2; display: inline-block;${boldStyle}`;
            this.editor.replaceSelection(`<span style="${styleString}">${cleanText}</span>`);
        }
    }
}

export default class CanvasFontSizePlugin extends Plugin {
    async onload() {
        this.addCommand({
            id: 'open-text-size-modal',
            name: 'Изменить размер текста',
            icon: 'a-large-small', 
            editorCallback: (editor: Editor) => {
                new SizeSuggestModal(this.app, editor).open();
            }
        });
    }
}
