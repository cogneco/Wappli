/// <reference path="../lib/jquery.d.ts"/>
/// <reference path="../lib/jquerymobile.d.ts"/>
/// <reference path="Widget.ts"/>
module Wappli {
	export class ListItem {
		constructor(public label: string, public onActivate: () => void = null, public count: number = undefined) {
		}
		public GetElement(): HTMLLIElement {
			var result: HTMLLIElement = <HTMLLIElement>document.createElement("li");
			if (this.onActivate !== null) {
				var link: HTMLAnchorElement = document.createElement("a");
				link.href = "#";
				link.appendChild(document.createTextNode(this.label));
				link.onclick = event => this.onActivate();
				result.appendChild(link);
			} else {
				result.appendChild(document.createTextNode(this.label));
				result.setAttribute("data-role", "divider");
			}
			if (this.count !== undefined) {
				var span: HTMLSpanElement = <HTMLSpanElement>document.createElement("span");
				span.classList.add("ui-li-count");
				span.appendChild(document.createTextNode(this.count.toString()));
				result.appendChild(span);
			}
			return result;
		}
	}
	export class List extends Widget {
		private list: HTMLUListElement;
		constructor(private getValues: () => ListItem[], mixed: boolean = false) {
			super();
			this.list = document.createElement("ul");
			this.list.setAttribute("data-role", "listview");
			if (mixed)
				this.list.setAttribute("data-inset", "true");
		}
		GetElement() {
			return this.list;
		}
		Update() {
			while (this.list.firstChild)
				this.list.removeChild(this.list.firstChild);
			var values = this.getValues();
			values.forEach(value => this.list.appendChild(value.GetElement()));
			$(this.list).listview("refresh");
		}
	}
}