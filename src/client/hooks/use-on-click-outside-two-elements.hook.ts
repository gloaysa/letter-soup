import React, { useEffect, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

/**
 * This hook will call the passed callback when the user clicks
 * outside of both of the elements passed
 * @param firstRef
 * @param secondRef
 * @param callback
 */
export const useOnClickOutsideTwoElementsHook = (
	firstRef: React.RefObject<HTMLElement>,
	secondRef: React.RefObject<HTMLElement>,
	callback: () => void
): void => {
	const [outsideFirst, setOutsideFirst] = useState<boolean>(false);
	const [outsideSecond, setOutsideSecond] = useState<boolean>(false);

	useOnClickOutside(secondRef, () => {
		setOutsideSecond(true);
	});

	useOnClickOutside(firstRef, () => {
		setOutsideFirst(true);
	});

	useEffect(() => {
		if (outsideFirst && outsideSecond) {
			callback();
		}
		if (outsideFirst || outsideSecond) {
			setOutsideFirst(false);
			setOutsideSecond(false);
		}
	}, [outsideFirst, outsideSecond]);
};
