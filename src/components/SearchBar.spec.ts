import { beforeEach, describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import SearchBar from "./SearchBar.vue";

vi.mock("../composables/useDebounce", () => ({
  default: (fn: Function) => fn
}));

describe("SearchBar", () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    wrapper = mount(SearchBar);
  });
  it("renders correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });
  it("renders input field", () => {
    expect(wrapper.find("input").exists()).toBe(true);
  });
  it("renders search icon", () => {
    expect(wrapper.find(".pi-search").exists()).toBe(true);
  });
  it("emits input event with correct value on input change", async () => {
    await wrapper.find("input").setValue("test");
    await wrapper.find("input").trigger("input");

    expect(wrapper.emitted("search")).toBeTruthy();
    expect(wrapper.emitted("search")![0]).toEqual(["test"]);
  });
  it("clears input field and emits search event when clear button is clicked", async () => {
    await wrapper.find("input").setValue("test");
    await wrapper.find("button").trigger("click");

    expect(wrapper.find("input").element.value).toBe("");
    expect(wrapper.emitted("search")).toBeTruthy();
  });
});
