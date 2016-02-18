"use strict";
import {Pallet} from "../app/js/pallet.jsx";
import {oPalletModel} from "../__tests__/data/rawdata";

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

describe("Pallet View Test",()=>{
    it("test dom structure",()=>{
	var palletView = TestUtils.renderIntoDocument(
		<Pallet model={oPalletModel}></Pallet>
	);

	var aGroups = TestUtils.scryRenderedDOMComponentsWithClass(palletView,"pallet-group");
	expect(aGroups.length).toBe(2);
    });
});
