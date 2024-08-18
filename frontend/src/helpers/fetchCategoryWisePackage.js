const { default: summaryApi } = require("../common")

const fetchCategoryWisePackage = async(category)=>{
    const response = await fetch(summaryApi.category_wise_package.url,{
        method : summaryApi.category_wise_package.method,
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            category : category
        })
    })

    const dataResponse = await response.json()

    return dataResponse
}

export default fetchCategoryWisePackage