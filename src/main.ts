import { Plugin, Editor, SuggestModal } from 'obsidian';

interface SizeOption {
    label: string;
    value: string | null;
}

class SizeSuggestModal extends SuggestModal<SizeOption> {
    editor: Editor;

    constructor(app: any, editor: Editor) {
        super(app);
        this.editor = editor;
        this.setPlaceholder("Выберите размер текста");
    }

    getSuggestions(query: string): SizeOption[] {
        const options: SizeOption[] = [
            { label: "❌ Очистить форматирование", value: null },
            { label: "10 px", value: "10" },
            { label: "20 px", value: "20" },
            { label: "30 px", value: "30" },
            { label: "40 px", value: "40" },
            { label: "50 px", value: "50" },
            { label: "60 px", value: "60" }
        ];
        return options.filter(o => o.label.toLowerCase().includes(query.toLowerCase()));
    }

    renderSuggestion(option: SizeOption, el: HTMLElement) {
        el.createEl("div", { text: option.label });
    }

    onChooseSuggestion(option: SizeOption, evt: MouseEvent | KeyboardEvent) {
        const selection = this.editor.getSelection();
        // Убираем старые теги перед наложением новых
        const cleanText = selection.replace(/<span style="font-size: [^>]*">/g, "").replace(/<\/span>/g, "");
        
        if (option.value === null) {
            this.editor.replaceSelection(cleanText);
        } else {
            this.editor.replaceSelection(`<span style="font-size: ${option.value}px; line-height: 1.2;">${cleanText}</span>`);
        }
    }
}

export default class TextResizerPlugin extends Plugin {
    async onload() {
        this.addCommand({
            id: 'open-text-size-modal',
            name: 'Изменить размер текста',
            icon: 'a-large-small', // Та самая иконка Aa
            editorCallback: (editor: Editor) => {
                new SizeSuggestModal(this.app, editor).open();
            }
        });
    }
}
