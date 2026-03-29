import { Plugin, Editor } from 'obsidian';

export default class TextResizerPlugin extends Plugin {
    async onload() {
        // Команда для шрифта 10px
        this.addCommand({
            id: 'wrap-text-10px',
            name: 'Font size: 10px',
            editorCallback: (editor: Editor) => {
                const text = editor.getSelection();
                editor.replaceSelection(`<span style="font-size: 10px; line-height: 1.2;">${text}</span>`);
            }
        });

        // Команда для шрифта 20px
        this.addCommand({
            id: 'wrap-text-20px',
            name: 'Font size: 20px',
            editorCallback: (editor: Editor) => {
                const text = editor.getSelection();
                editor.replaceSelection(`<span style="font-size: 20px; line-height: 1.2;">${text}</span>`);
            }
        });

        // Команда для шрифта 30px
        this.addCommand({
            id: 'wrap-text-30px',
            name: 'Font size: 30px',
            editorCallback: (editor: Editor) => {
                const text = editor.getSelection();
                editor.replaceSelection(`<span style="font-size: 30px; line-height: 1.2;">${text}</span>`);
            }
        });

        // Команда для шрифта 40px
        this.addCommand({
            id: 'wrap-text-40px',
            name: 'Font size: 40px',
            editorCallback: (editor: Editor) => {
                const text = editor.getSelection();
                editor.replaceSelection(`<span style="font-size: 40px; line-height: 1.2;">${text}</span>`);
            }
        });
    }

    onunload() {
        // Этот метод вызывается при выключении плагина, нам тут ничего делать не нужно
    }
}
