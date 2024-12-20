import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const search = this?.query?.search;
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: search, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  //   filter() {
  //     const queryObj = { ...this.query }; //copy

  //     // filetering
  //     const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  //     excludeFields.forEach((el) => delete queryObj[el]);

  //     this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

  //     return this;
  //   }

  sortBy() {
    const sortBy =
      (this?.query?.sortBy as string)?.split(',')?.join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sortBy as string);
    return this;
  }

  sortOrder() {
    // console.log(this?.query);
    const defaultField = 'createdAt';
    const sortOrder =
      this?.query?.sortOrder === 'asc'
        ? 1
        : this?.query?.sortOrder === 'desc'
          ? -1
          : 1;

    this.modelQuery = this.modelQuery.sort({ [defaultField]: sortOrder });
    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;
