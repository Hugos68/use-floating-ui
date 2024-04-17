import { computePosition, autoUpdate, type ComputePositionConfig } from '@floating-ui/dom';

export type FloatingContext = {
	floatingEl: HTMLElement | null;
	referenceEl: HTMLElement | null;
	show: boolean;
};

export function useFloating(options: ComputePositionConfig = {}) {
	/* State */
	let floatingEl = $state<HTMLElement | null>(null);
	let referenceEl = $state<HTMLElement | null>(null);
	let show = $state(false);

	/* Function */
	async function updatePosition() {
		if (referenceEl === null || floatingEl === null) {
			return;
		}
		const position = await computePosition(referenceEl, floatingEl, options);
		floatingEl.style.x = `${position.x}px`;
		floatingEl.style.y = `${position.y}px`;
	}

	/* Lifecycle */
	$effect(() => {
		if (referenceEl === null || floatingEl === null) {
			return;
		}
		return autoUpdate(referenceEl, floatingEl, updatePosition);
	});

	/* Actions */
	function reference(node: HTMLElement, behavior: 'hover' | 'click' | 'none' = 'none') {
		referenceEl = node;

		function handleMouseEnter() {
			if (behavior === 'hover') {
				show = true;
			}
		}
		function handleMouseLeave() {
			if (behavior === 'hover') {
				show = false;
			}
		}
		function handleClick() {
			if (behavior === 'click') {
				show = !show;
			}
		}

		node.addEventListener('mouseenter', handleMouseEnter);
		node.addEventListener('mouseleave', handleMouseLeave);
		node.addEventListener('click', handleClick);

		function update(v: typeof behavior) {
			show = false;
			behavior = v;
		}

		function destroy() {
			node.removeEventListener('mouseenter', handleMouseEnter);
			node.removeEventListener('mouseleave', handleMouseLeave);
			node.removeEventListener('click', handleClick);
		}

		return {
			update,
			destroy
		};
	}

	function floating(node: HTMLElement) {
		floatingEl = node;
	}
	return {
		reference,
		floating,
		get show() {
			return show;
		}
	};
}
