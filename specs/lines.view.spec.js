"use strict";
import {Grid} from "../app/js/Grid.jsx";

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

describe("Grid Line Test",()=>{
    it("test dom structure",()=>{
	var gridView = TestUtils.renderIntoDocument(
		<Grid gridSize={10} width={100} height={100}/>
	);

	var aLine = TestUtils.scryRenderedDOMComponentsWithClass(gridView,"grid-line");
	expect(aLine.length).toBe(18);

	
	aLine = TestUtils.scryRenderedDOMComponentsWithClass(gridView,"grid-v-line");
	expect(aLine.length).toBe(9);

	aLine = TestUtils.scryRenderedDOMComponentsWithClass(gridView,"grid-h-line");
	expect(aLine.length).toBe(9);
    });
});
