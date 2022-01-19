class ApiFeatures {
    constructor(query, queryString) {
        this.query = query
        this.queryString = queryString
    }

    filter() {
        const queryObj = {...this.queryString};

        //exclude this keywords from query string parameter
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(field => delete queryObj[field]);

        //setup to search for greater or less in query string parameters
        let queryStr = JSON.stringify(queryObj).replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        this.query.find(JSON.parse(queryStr));

        return this;
    }

    sort() {
        //Sort Db and set default sort as duration
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('duration')
        }
        return this;
    }

    limitFields() {
        //Get exact fields from db
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields)
        } else {
            this.query = this.query.select('-__v');
        }
        return this;
    }

    paginate() {
        //pagination
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 9;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }

}

module.exports = ApiFeatures