const findMissingFields = (requiredfieldArray, reqBody) => {
    if(!Array.isArray(requiredfieldArray) && typeof reqBody !== 'object'){
        return { error: 'Invalid input' }
    }
    let missingfields = requiredfieldArray.filter((field)=> !reqBody.hasOwnProperty(field));
    if(missingfields.length > 0){
        return  {isMissing : true , fields : missingfields}
    }else{
        return {isMissing : false}
    }
}

const isValidPhoneNumber = (mobile) => {
	var phoneno = /^[6-9][0-9]{9}$/;
	if (!mobile.match(phoneno)) {
		return false;
	} else {
		return true;
	}
};

const isValidEmail = (email) => {
	if (/^[a-zA-Z0-9]{1}[A-Za-z0-9.+_-]+@[A-Za-z0-9]+\.[A-Za-z]{2,}$/.test(email)) {
		return true;
	} else {
		return false;
	}
};


module.exports = { findMissingFields, isValidEmail, isValidPhoneNumber }