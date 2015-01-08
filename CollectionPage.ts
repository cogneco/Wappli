/// <reference path="Service.ts"/>
/// <reference path="Page.ts"/>

module Wappli {
	export class CollectionPage<T> extends Page {
		public get Collection(): Collection<T> { return this.collection; }
		private values: T[];
		get Values(): T[] { return this.values; }
		constructor(name: string, private collection: Collection<T>) {
			super(name);
			this.collection = null;
		}
		Update(): void {
			this.Collection.Get((values: T[]) => {
				this.values = values;
				super.Update();
			});
		}
	}
}