import 'babel-polyfill';

class LH {
    
    constructor(){
        this.features = new Map()
    }

    push(feature, id=null){
        if(typeof feature !== "string") throw new Error("Value must be string.")
        if( this.features.has(feature) ) throw new Error("Feature already added, unique feature name required.")
            //not null and not a string or is a string but doesnt match regex test
            //regex tests for is single character that is an uppercase letter between A-Z 
        if( id !== null && typeof id !== "string" || (typeof id === "string" && !(id.match(/^[A-Z]{1}$/ ))) ) throw new Error("Value must be character between A-Z and uppercase.")
        this.features.set(feature, id)
    }

    isEnabled(feature){
        if(typeof feature !== "string") throw new Error("Value must be string.")
        return this.features.get(feature) !== undefined
    }

    getEnabledIDs(){
        return Array.from(this.features.values()).join('')
    }

    //Destroys the current instance of singleton and creates a new one.
    //This is only a helper function.
    reset(){
        this.constructor()
    }
}

export default new LH()