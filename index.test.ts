import { getResultList, getResult } from "./index";
import { IQuery, IItem } from "./type";

const items: IItem[] = [
  {
    id: "1",
    title: "javascript",
    type: "lang",
    value: 1
  },
  {
    id: "2",
    title: "typescript",
    type: "lang",
    value: 2
  }
];

describe("#getResult", () => {
  describe("if include condition is given", () => {
    const query: IQuery = {
      include: ["id:1"],
      exclude: [],
      sortBy: []
    };

    it("result has only matched items, id === 1", () => {
      const result = getResult(items, query);
      result.forEach(item => {
        expect(item.id).toBe("1");
      });
    });

    it("has only one item", () => {
      const result = getResult(items, query);
      expect(result.length).toBe(1);
    });
  });

  describe("if include condition is given as number", () => {
    const query: IQuery = {
      include: ["value:2"],
      exclude: [],
      sortBy: []
    };

    it("result has only matched items, value === 2", () => {
      const result = getResult(items, query);
      result.forEach(item => {
        expect(item.value).toBe(2);
      });
    });

    it("has only one item", () => {
      const result = getResult(items, query);
      expect(result.length).toBe(1);
    });
  });

  describe("if multiple conditions are given", () => {
    const query: IQuery = {
      include: ["id:1"],
      exclude: ["title:javascript"],
      sortBy: []
    };

    it("has no items", () => {
      const result = getResult(items, query);
      expect(result.length).toBe(0);
    });
  });
});

describe("#getResultList", () => {
  const sampleQuery = {
    include: [],
    exclude: [],
    sortBy: []
  };

  let queries: IQuery[];

  describe("if many queries are given", () => {
    queries = [sampleQuery, sampleQuery, sampleQuery];
    it("results.length must equal queries.length", () => {
      expect(getResultList(items, queries).length).toBe(queries.length);
    });
  });
});
