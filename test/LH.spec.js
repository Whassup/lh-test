import LH from '../src/modules/LH'

describe("LH Unit Tests", () => {
    beforeEach(()=> {
        LH.reset()//State of LH should be reset for every test
    })

    //LH
    it("LH is defined", () => {
        expect( LH ).toBeDefined()
    })

    it("LH is a singleton and cannot be created as a new class", () => {
        try{
            expect( typeof (new LH()) ).not.toBe('object')
        } catch(e){}
    })

    //LH.push
    it("LH.push() should return undefined.", () => {
        expect( LH.push('featureWithID', 'A') ).toBeUndefined()
        expect( LH.push('featureWithNoID') ).toBeUndefined()
    })

    it("LH.push() should allow only for string to be provided for feature name", () => {
        let e = new Error("Value must be string.");
        expect( function(){ LH.push('feature') }).not.toThrow( e )
        expect(function(){ LH.push(1) }).toThrow( e )
        expect(function(){  LH.push(true) }).toThrow( e )
        expect(function(){ LH.push({}) }).toThrow( e )
        
    })

    it("LH.push() should allow only for alpha characters A-Z that are upper case only to be provided for feature id", () => {
        let e = new Error("Value must be character between A-Z and uppercase.")
        expect(function(){ LH.push('feature1', 'A') }).not.toThrow( e )
        expect(function(){ LH.push('feature2', 'a') }).toThrow( e )
        expect(function(){ LH.push('feature3', 1) }).toThrow( e )
        expect(function(){ LH.push('feature4', true) }).toThrow( e )
        expect(function(){ LH.push('feature5', {}) }).toThrow( e )
    })

    it("LH.push() should allow only unique feature names", () => {
        let e = new Error("Feature already added, unique feature name required.")
        expect(function(){ LH.push('feature1', 'A') }).not.toThrow( e )
        expect(function(){ LH.push('feature1', 'B') }).toThrow( e )
    })

    //LH.isEnabled()
    it("LH.isEnabled() should return boolean.", () => {
        expect(typeof LH.isEnabled('feature1')).toBe('boolean')
        LH.push('feature1', 'A') 
        LH.push('feature2')
        expect(typeof LH.isEnabled('feature1')).toBe('boolean') 
        expect(typeof LH.isEnabled('feature2')).toBe('boolean')
    })

    it("LH.isEnabled() should allow only for string to be provided for feature name", () => {
        let e = new Error("Value must be string.")
        expect(function(){ LH.isEnabled('feature') }).not.toThrow( e )
        expect(function(){ LH.isEnabled(1) }).toThrow( e )
        expect(function(){ LH.isEnabled(true) }).toThrow( e )
        expect(function(){ LH.isEnabled({}) }).toThrow( e )
    })

    it("LH.isEnabled() should return true when a feature is enabled.", () => {
        LH.push('feature1', 'A') 
        LH.push('feature2') 
        expect( LH.isEnabled('feature1') ).toBe(true)
        expect( LH.isEnabled('feature2') ).toBe(true)
    })

    it("LH.isEnabled() should return false when feature is not enabled.", () => {
        expect( LH.isEnabled('feature1') ).toBe(false)
        expect( LH.isEnabled('') ).toBe(false)
        expect( LH.isEnabled(' ') ).toBe(false)
        LH.push('feature1')
        expect( LH.isEnabled('feature1') ).toBe(true)
    })

    //LH.getEnabledIDs
    it("LH.getEnabledIDs() should return string.", () => {
        expect(typeof LH.getEnabledIDs()).toBe('string')
    })

    it("LH.getEnabledIDs() should return ''(empty string) if no features that have an ID have been enabled.", () => {
        expect( LH.getEnabledIDs()).toBe('')
    })

    it("LH.getEnabledIDs() should return 'A' if feature is added with id of 'A' ", () => {
        LH.push("feature1", "A")
        expect( LH.getEnabledIDs() ).toBe('A')
    })

    it("LH.getEnabledIDs() should return 'AB' if features are added with ids of 'A' and 'B' ", () => {
        LH.push("featureX", "A")
        LH.push("featureY", "B")
        expect( LH.getEnabledIDs() ).toBe('AB')
    })

    it("LH.getEnabledIDs() should return 'ABCEDF' if features are added with ids of 'A','B','C', 'D' and 'E' ", () => {
        LH.push("feature1", "A")
        LH.push("feature2", "B")
        LH.push("feature3", "C")
        LH.push("feature4", "D")
        LH.push("feature5", "E")
        expect( LH.getEnabledIDs() ).toBe('ABCDE')
    })

});

    