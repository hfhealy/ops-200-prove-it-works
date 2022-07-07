const express = require('express');
const expect = require('chai').expect;
const path = require('path');
const Nightmare = require('nightmare');

const app = express();

app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../dist')));

const url = 'http://localhost:8888';

const nightmare = new Nightmare();

describe('End to End Tests', () => {

	let httpServer = null;
	let pageObject = null;

	before((done) => {
		httpServer = app.listen(8888);
		done();
	});

	beforeEach(() => {
		pageObject = nightmare.goto(url);
	});

	after((done) => {
		httpServer.close();
		done();
	});

it('should contain a <h1> element for the page title', () => { 
	return pageObject
		.evaluate(() => document.querySelector('h1').innerText)
		.then(headerText => {
		expect(headerText).to.not.be.null;
		expect(headerText).to.equal('Mortgage Calculator');
		});
	});

it('should have an input element with the name of "principal"', () => {
    pageObject
        .evaluate(() => document.querySelector('select[name=principal]'))
        .then(input => expect(input).to.exist)
    });

it('should have an input element with the name of "interestRate"', () => {
        pageObject
        .evaluate(() => document.querySelector('select[name=interestRate]'))
        .then(input => expect(input).to.exist)
        });

it('should have an input element with the name of "loanTerm"', () => {
        pageObject
        .evaluate(() => document.querySelector('select[name=loanTerm]'))
        .then(input => expect(input).to.exist)
        });

it('should have an select element with the name of "period"', () => {
        pageObject
        .evaluate(() => document.querySelector('select[name=period]'))
        .then(input => expect(select).to.exist)
        });

it('should contain a button with the name of "submit"', () => {
        pageObject
        .evaluate(() => document.querySelector('button[name=submit]'))
        .then(input => expect(input).to.exist)
});

it('should correctly calculate mortgage', () =>
        pageObject
        .wait()
        .type('input[name=principal]', 300000)
        .type('input[name=interestRate]', 3.75)
        .type('input[name=loanTerm]', 30)
        .select('select[name=period]', 12)
        .click('button#calculate')
        .wait('#output')
        .evaluate(() => document.querySelector('#output').innerText)
        .then((outputText) => {
            expect(outputText).to.equal('$1389.35');
        })
        ).timeout(6500); 
        
it('should correctly calculate mortgage', () =>
        pageObject
        .wait()
        .type('input[name=principal]', 420000)
        .type('input[name=interestRate]', 3.75)
        .type('input[name=loanTerm]', 30)
        .select('select[name=period]', 12)
        .click('button#calculate')
        .wait('#output')
        .evaluate(() => document.querySelector('#output').innerText)
        .then((outputText) => {
            expect(outputText).to.equal('$1945.09');
        })
        ).timeout(6500);
});

