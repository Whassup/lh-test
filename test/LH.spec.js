import LH from '../src/modules/LH'

describe("LH Unit Tests", () => {
    //LH
    it("LH is defined", () => {
        expect( LH ).toBeDefined()
    })

    it("LH is a singleton and cannot be created as a new class", () => {
        expect( new LH() ).toThrowError(new Error("Uncaught TypeError: r.default is not a constructor") )
    })

    //LH.push
    it("LH.push() should return undefined.", () => {
        expect( LH.push()).toBeUndefined()
        expect( LH.push('featureWithID', A) ).toBeUndefined()
        expect( LH.push('featureWithNoID') ).toBeUndefined()
    })

    it("LH.push() should allow only for string to be provided for feature name", () => {
        expect( LH.push('feature') ).not.toThrowError( new Error("Value must be string") )
        expect( LH.push(1) ).toThrowError( new Error("Value must be string") )
        expect( LH.push(true) ).toThrowError( new Error("Value must be string") )
        expect( LH.push({}) ).toThrowError( new Error("Value must be string") )
    })

    it("LH.push() should allow only for alpha characters A-Z that are upper case only to be provided for feature id", () => {
        expect( LH.push('feature1', 'A') ).not.toThrowError( new Error("Value must be character between A-Z and uppercase.") )
        expect( LH.push('feature2', 'a') ).toThrowError( new Error("Value must be character between A-Z and uppercase.") )
        expect( LH.push('feature3', 1) ).toThrowError( new Error("Value must be character between A-Z and uppercase.") )
        expect( LH.push('feature4', true) ).toThrowError( new Error("Value must be character between A-Z and uppercase.") )
        expect( LH.push('feature5', {}) ).toThrowError( new Error("Value must be character between A-Z and uppercase.") )
    })

    it("LH.push() should allow only unique feature names", () => {
        expect( LH.push('feature1', 'A') ).not.toThrowError( new Error("Feature already added, unique feature name required.") )
        expect( LH.push('feature1', 'B') ).toThrowError( new Error("Feature already added, unique feature name required.") )
    })

    //LH.isEnabled()
    it("LH.isEnabled() should return boolean.", () => {
        expect(typeof LH.isEnabled()).toBe('boolean')
        LH.push('feature1', 'A') 
        LH.push('feature2')
        expect(typeof LH.isEnabled('feature1')).toBe('boolean') 
        expect(typeof LH.isEnabled('feature2')).toBe('boolean')
    })

    it("LH.isEnabled() should allow only for string to be provided for feature name", () => {
        expect( LH.isEnabled('feature') ).not.toThrowError( new Error("Value must be string") )
        expect( LH.isEnabled(1) ).toThrowError( new Error("Value must be string") )
        expect( LH.isEnabled(true) ).toThrowError( new Error("Value must be string") )
        expect( LH.isEnabled({}) ).toThrowError( new Error("Value must be string") )
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

    