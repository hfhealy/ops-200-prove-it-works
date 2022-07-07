const expect = require('chai').expect;
const Mortgage = require('../../src/js/lib/Mortgage');

describe('Mortgage Calculator', () => {
    let mortgage = null;

    beforeEach(() => {
            let principal = 670000;
    
            let interest= 4.25;
    
            let term = 15;
    
            let period = 12;
    
            mortgage = new Mortgage(principal, interest, term, period);
    
        });
        
it('should have a monthlyPayment function', () => {
    expect(mortgage.monthlyPayment()).to.exist;
    });

    it('should calculate the correct monthly payment', () => {
    expect(mortgage.monthlyPayment()).to.equal(5040.27);
    });
});