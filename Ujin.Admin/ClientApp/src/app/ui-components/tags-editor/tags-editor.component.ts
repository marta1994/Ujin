import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-tags-editor',
    templateUrl: './tags-editor.component.html',
    styleUrls: ['./tags-editor.component.less']
})
export class TagsEditorComponent implements OnInit {

    private _tags: string;
    public get tags(): string {
        return this._tags;
    }
    @Input()
    public set tags(value: string) {
        if (this._tags === value) return;
        this._tags = value;
        this.tagsChange.emit(this._tags);
    }

    @Output()
    public tagsChange: EventEmitter<string> = new EventEmitter<string>();

    @Input()
    public hintTags: string[];

    public parsedTags: string[] = [];

    public currentTag: string = "";

    public currentHint: string[];

    constructor() { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.tags) {
            this.parsedTags = JSON.parse(this.tags);
        }
        this.currentHint = this.filteredHint;
    }

    public get filteredHint(): string[] {
        return this.hintTags ? this.hintTags.filter(t => this.parsedTags.indexOf(t) < 0) : [];
    }

    public track(index: number): any {
        return index;
    }

    public removeTag(index: number) {
        this.parsedTags.splice(index, 1);
        this.tags = JSON.stringify(this.parsedTags);
    }

    public currentTagChange() {
        if (this.currentTag.endsWith(" ")) {
            let trimmed = this.currentTag.trim();
            if (trimmed.length == 0) return;
            this.parsedTags.push(trimmed.toLowerCase());
            this.tags = JSON.stringify(this.parsedTags);
            this.currentTag = "";
            return;
        }
        this.currentHint = this.filteredHint.filter(h => h.startsWith(this.currentTag.toLowerCase()));
    }

    public selectHint(hint: string) {
        this.parsedTags.push(hint);
        this.tags = JSON.stringify(this.parsedTags);
        this.currentTag = "";
    }
}
