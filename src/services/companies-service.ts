import fs from "fs";
import { Company } from "src/types";
import util from "util";

/**
 * We want to use async/await with fs.readFile - util.promisfy gives us that
 */
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

/**
 * Logic for fetching companies information
 */
export class CompaniesService {
  /**
   * Constructor
   * @param {string} datafile Path to a JSOn file that contains the companies data
   */
  constructor(private readonly datafile: string) { }

  /**
   * Get a list of companies
   */
  async getList() {
    const data = await this.getData();
    return data;
  }

  /**
   * Returns a company that matches the given siren.
   * @param {number} siren The siren.
   */
  async getBySiren(siren: number) {
    const data = await this.getData();
    return data.find((company: Company) => company.siren === siren);
  }

  /**
   * Returns the two last years results of a company that matches the given siren.
   * @param {number} siren The siren.
   */
  async getTwoLastYearsResults(siren: number) {
    const company = await this.getBySiren(siren) as Company;
    let res;
    if (company !== undefined && company.results.length > 1) {
      res = company.results[0];
      res.ca -= company.results[1].ca;
      res.margin -= company.results[1].margin;
      res.ebitda -= company.results[1].ebitda;
      res.loss -= company.results[1].loss;
      res.year = `${company.results[1].year} - ${company.results[0].year}`;
    }
    return res;
  }

  /**
   * Returns all the companies that operates in the given sector.
   * @param {string} sector The sector.
   */
  async getBySector(sector: string) {
    const data = await this.getData();
    return data.filter((company: Company) => company.sector === sector);
  }

  /**
   * Delete a company by siren.
   * @param {number} siren The siren.
   */
  async removeBySiren(siren: number) {
    let data = (await this.getData()) || [];

    const company = await this.getBySiren(siren);
    if (company !== undefined) {
      data = data.filter((company: Company) => company.siren !== siren);
    }
    return writeFile(this.datafile, JSON.stringify(data));
  }

  /**
   * Update a company.
   * @param {Company} newCompany The new company.
   */
  async updateCompany(newCompany: Company) {
    let data = (await this.getData()) || [];

    const idx = data.findIndex((company: Company) => company.siren === newCompany.siren);
    if (idx !== -1 && idx < data.length) {
      data[idx] = newCompany;
    }
    return writeFile(this.datafile, JSON.stringify(data));
  }

  /**
   * Add a new company in front of the existing ones.
   * @param {Company} company The new company to add
   */
  async addCompany(company: Company) {
    const data = (await this.getData()) || [];
    data.unshift(company);
    return writeFile(this.datafile, JSON.stringify(data));
  }

  /**
   * Fetches companies data from the JSON file provided to the constructor
   */
  async getData() {
    const data = await readFile(this.datafile, "utf8");
    return JSON.parse(data);
  }
}
