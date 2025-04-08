export function blurActiveElement(): void {
	(document.activeElement as HTMLElement)?.blur();
}