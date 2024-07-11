import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import ContactItem from "../components/ContactItem.vue";

describe("Тесты для ContactItem.vue", () => {
  it("Верный рендер контакта", () => {
    const contact = {
      id: 1,
      name: "John Doe",
      phone: "+71234567890",
      email: "john@example.com",
    };
    const wrapper = mount(ContactItem, {
      props: { contact },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("Верный рендер при редактировании", async () => {
    const contact = {
      id: 1,
      name: "John Doe",
      phone: "+71234567890",
      email: "john@example.com",
    };
    const wrapper = mount(ContactItem, {
      props: { contact },
    });

    await wrapper.find("button").trigger("click");

    const emitted = wrapper.emitted("edit")!;
    expect(emitted).toHaveLength(1);
    expect(emitted[0][0]).toEqual(contact);
  });

  it("Верный рендер при удалении", async () => {
    const contact = {
      id: 1,
      name: "John Doe",
      phone: "+71234567890",
      email: "john@example.com",
    };
    const wrapper = mount(ContactItem, {
      props: { contact },
    });

    await wrapper.findAll("button")[1].trigger("click");

    const emitted = wrapper.emitted("delete")!;
    expect(emitted).toHaveLength(1);
    expect(emitted[0][0]).toBe(contact.id);
  });
});
