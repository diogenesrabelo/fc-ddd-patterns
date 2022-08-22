import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import CustomerCreatedEvent from "../../customer/event/customer-created-event";
import SendEmailWhenCreatedNewCustomerHandler from "../../customer/event/handler/send-email-when-created-new-customer.handler";
import SendEmailWhenCreatedNewCustomer2Handler from "../../customer/event/handler/send-email-when-created-new-customer2.handler";
import SendEmailWhenChangeAddressHandler from "../../customer/event/handler/send_email-when-change-address.handler";
import EventDispatcher from "./event-dispatcher";
import Address from "../../customer/value-object/address";
import CustomerChangedAddressEvent from "../../customer/event/customer-changed-address.event";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });


  it("should register two events handlers when customer is created", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendEmailWhenCreatedNewCustomerHandler();
    const eventHandler2 = new SendEmailWhenCreatedNewCustomer2Handler();

    eventDispatcher.register("CustomerCreatedEvent1", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent2", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent1"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent1"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent1"][0]
    ).toMatchObject(eventHandler1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent2"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent2"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent2"][0]
    ).toMatchObject(eventHandler2);
  });

  it("should register two events handlers when customer is updated", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendEmailWhenChangeAddressHandler();

    eventDispatcher.register("CustomerChangedAddressEvent", eventHandler1);

    expect(
      eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]
    ).toMatchObject(eventHandler1);
  });

  it("should unregister an event handler CustomerCreatedEvent", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenCreatedNewCustomerHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
      0
    );
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenCreatedNewCustomerHandler();
    const eventHandler2 = new SendEmailWhenCreatedNewCustomer2Handler();
    const eventHandler3 = new SendEmailWhenChangeAddressHandler();

    eventDispatcher.register("CustomerCreatedEvent1", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent2", eventHandler2);
    eventDispatcher.register("CustomerChangedAddressEvent", eventHandler3);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent1"][0]
    ).toMatchObject(eventHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent2"][0]
    ).toMatchObject(eventHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent1"]
    ).toBeUndefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent2"]
    ).toBeUndefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"]
    ).toBeUndefined();
  });

  it("should notify all customer event handlers but verify first handle", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenCreatedNewCustomerHandler();
    const eventHandler2 = new SendEmailWhenCreatedNewCustomer2Handler();
    const eventHandler3 = new SendEmailWhenChangeAddressHandler();

    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    //const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
    //const spyEventHandler3 = jest.spyOn(eventHandler3, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
    eventDispatcher.register("CustomerChangedAddressEvent", eventHandler3);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler2);
    expect(
      eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]
    ).toMatchObject(eventHandler3);
    
    const address = new Address(
      "Rua 1",
      135,
      "12345678",
      "São Paulo"
    );
    const customerCreatedEvent = new CustomerCreatedEvent({});

    eventDispatcher.notify(customerCreatedEvent);

    const newAddress = new Address(
      "Rua B",
      531,
      "12345678",
      "Bahia"
    );

    const customerChangedAddressEvent = new CustomerChangedAddressEvent({
      name: "João",
      address: newAddress,
      id: "123"
    });

    // Quando o notify for executado o SendEmailWhenCreatedNewCustomerHandler.handle() será chamado
    
    eventDispatcher.notify(customerChangedAddressEvent);
    expect(spyEventHandler).toHaveBeenCalled();
    //expect(spyEventHandler2).toHaveBeenCalled();
    //expect(spyEventHandler3).toHaveBeenCalled();
  });

  it("should notify all customer event handlers but verify second handle", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenCreatedNewCustomerHandler();
    const eventHandler2 = new SendEmailWhenCreatedNewCustomer2Handler();
    const eventHandler3 = new SendEmailWhenChangeAddressHandler();

    //const spyEventHandler = jest.spyOn(eventHandler, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
    //const spyEventHandler3 = jest.spyOn(eventHandler3, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
    eventDispatcher.register("CustomerChangedAddressEvent", eventHandler3);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler2);
    expect(
      eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]
    ).toMatchObject(eventHandler3);
    
    const address = new Address(
      "Rua 1",
      135,
      "12345678",
      "São Paulo"
    );
    const customerCreatedEvent = new CustomerCreatedEvent({});

    eventDispatcher.notify(customerCreatedEvent);

    const newAddress = new Address(
      "Rua B",
      531,
      "12345678",
      "Bahia"
    );

    const customerChangedAddressEvent = new CustomerChangedAddressEvent({
      name: "João",
      address: newAddress,
      id: "123"
    });

    // Quando o notify for executado o SendEmailWhenCreatedNewCustomerHandler2.handle() será chamado
    
    eventDispatcher.notify(customerChangedAddressEvent);
    //expect(spyEventHandler).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
    //expect(spyEventHandler3).toHaveBeenCalled();
  });

  it("should notify all customer event handlers but verify last handle", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenCreatedNewCustomerHandler();
    const eventHandler2 = new SendEmailWhenCreatedNewCustomer2Handler();
    const eventHandler3 = new SendEmailWhenChangeAddressHandler();

    //const spyEventHandler = jest.spyOn(eventHandler, "handle");
    //const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
    const spyEventHandler3 = jest.spyOn(eventHandler3, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
    eventDispatcher.register("CustomerChangedAddressEvent", eventHandler3);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler2);
    expect(
      eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]
    ).toMatchObject(eventHandler3);
    
    const address = new Address(
      "Rua 1",
      135,
      "12345678",
      "São Paulo"
    );
    const customerCreatedEvent = new CustomerCreatedEvent({});

    eventDispatcher.notify(customerCreatedEvent);

    const newAddress = new Address(
      "Rua B",
      531,
      "12345678",
      "Bahia"
    );

    const customerChangedAddressEvent = new CustomerChangedAddressEvent({
      name: "João",
      address: newAddress,
      id: "123"
    });

    // Quando o notify for executado o SendEmailWhenChangeAddressHandler.handle() será chamado
    
    eventDispatcher.notify(customerChangedAddressEvent);
    //expect(spyEventHandler).toHaveBeenCalled();
    //expect(spyEventHandler2).toHaveBeenCalled();
    expect(spyEventHandler3).toHaveBeenCalled();
  });
});
