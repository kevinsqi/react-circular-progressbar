// Type definitions for [react-circular-progressbar]
// Project: [https://github.com/iqnivek/react-circular-progressbar]
// Definitions by: [Rok Dvojmoc] <https://github.com/rdvojmoc>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import * as React from 'react';

declare module "react-circular-progressbar" {
	export interface CircularProgressbarProps {
		percentage: number;
		className?: string;
		strokeWidth?: number;
		background?: boolean;
		backgroundPadding?: number;
		initialAnimation?: boolean;
		classForPercentage?: {};
		textForPercentage?: {};
		classes?: IClassMap;
	}

	export interface IClassMap{
		root:string;
		trail: string;
		path: string;
		text: string;
		background: string;
	}

	class CircularProgressbar extends React .Component<CircularProgressbarProps, any> { 
	}

}

export default CircularProgressbar;

