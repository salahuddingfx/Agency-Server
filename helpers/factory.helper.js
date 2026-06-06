export const getAll = (Model, populateOptions = '') => {
  return async (req, res, next) => {
    try {
      // 1. Copy queries
      const reqQuery = { ...req.query };

      // 2. Fields to exclude
      const excludeFields = ['select', 'sort', 'page', 'limit', 'q'];
      excludeFields.forEach((param) => delete reqQuery[param]);

      // 3. Search handling
      let queryStr = JSON.stringify(reqQuery);
      // Map comparison operators (gte, gt, lte, lt, in)
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt|in)\b/g, (match) => `$${match}`);

      let query = Model.find(JSON.parse(queryStr));

      // 4. Text searching index query
      if (req.query.q) {
        // Find text match fields based on model
        const searchRegex = new RegExp(req.query.q, 'i');
        const textConditions = [];

        // Build conditional search fields depending on model keys
        const paths = Object.keys(Model.schema.paths);
        if (paths.includes('title')) textConditions.push({ title: searchRegex });
        if (paths.includes('name')) textConditions.push({ name: searchRegex });
        if (paths.includes('company')) textConditions.push({ company: searchRegex });
        if (paths.includes('subject')) textConditions.push({ subject: searchRegex });

        if (textConditions.length > 0) {
          query = query.or(textConditions);
        }
      }

      // 5. Selection projection
      if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
      }

      // 6. Sorting sorting
      if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
      } else {
        query = query.sort('-createdAt');
      }

      // 7. Pagination settings
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const total = await Model.countDocuments(query.getFilter());

      query = query.skip(startIndex).limit(limit);

      if (populateOptions) {
        query = query.populate(populateOptions);
      }

      // Run query execution
      const results = await query;

      // Pagination metadata response
      const pagination = {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      };

      if (endIndex < total) {
        pagination.next = { page: page + 1, limit };
      }
      if (startIndex > 0) {
        pagination.prev = { page: page - 1, limit };
      }

      res.status(200).json({
        success: true,
        count: results.length,
        pagination,
        data: results,
      });
    } catch (error) {
      next(error);
    }
  };
};

export const getOne = (Model, populateOptions = '') => {
  return async (req, res, next) => {
    try {
      let query = Model.findById(req.params.id);

      if (populateOptions) {
        query = query.populate(populateOptions);
      }

      const doc = await query;

      if (!doc) {
        return res.status(404).json({
          success: false,
          message: 'Document not found with given id',
        });
      }

      res.status(200).json({
        success: true,
        data: doc,
      });
    } catch (error) {
      next(error);
    }
  };
};

export const createOne = (Model) => {
  return async (req, res, next) => {
    try {
      const doc = await Model.create(req.body);

      res.status(201).json({
        success: true,
        data: doc,
      });
    } catch (error) {
      next(error);
    }
  };
};

export const updateOne = (Model) => {
  return async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!doc) {
        return res.status(404).json({
          success: false,
          message: 'Document not found with given id',
        });
      }

      res.status(200).json({
        success: true,
        data: doc,
      });
    } catch (error) {
      next(error);
    }
  };
};

export const deleteOne = (Model) => {
  return async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndDelete(req.params.id);

      if (!doc) {
        return res.status(404).json({
          success: false,
          message: 'Document not found with given id',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Deleted successfully',
        data: {},
      });
    } catch (error) {
      next(error);
    }
  };
};
