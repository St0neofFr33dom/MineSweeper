
    const getItem = (key) => {
    const isBrowser = (() => typeof window !== 'undefined')()
        if (isBrowser){
            console.log("Browser is true")
            if (window['localStorage'][key] === undefined){
                return '0'
            }
            else{
                return window['localStorage'][key]
            }
        } else {
            return ' '
        }
    };
  
    const setItem = (key, value) => {
        const isBrowser = (() => typeof window !== 'undefined')()
      if (isBrowser) {
        window['localStorage'].setItem(key, value);
        return true;
      }
  
      return false;
    };
  
    const removeItem = (key)=> {
      window['localStorage'].removeItem(key);
    };
  
export {getItem, setItem, removeItem}