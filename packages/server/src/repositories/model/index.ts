import { Knex } from "knex";

export class RepositoryModel {
  public async getPagination({
    page,
    limit,
    client,
    tableName,
  }: {
    page: number;
    limit: number;
    client: Knex;
    tableName: string;
  }) {
    const totalCountQuery = client(tableName).count("id as total");
    const [{ total }] = await totalCountQuery;

    const offset = (page - 1) * limit;
    const lastPage = Math.ceil(Number(total) / limit);
    const currentPage = page > lastPage ? lastPage : page;
    const prevPage = currentPage > 1 ? currentPage - 1 : null;

    return { offset, lastPage, currentPage, prevPage, total };
  }
}
