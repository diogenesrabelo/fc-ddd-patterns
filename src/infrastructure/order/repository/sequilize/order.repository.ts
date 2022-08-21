import Order from "../../../../domain/checkout/entity/order";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderFactory from "../../../../domain/checkout/factory/order.factory";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    });
    return orders.map(
      (order) =>
      OrderFactory.create({
        id: order.id,
        customerId: order.customer_id,
        items: order.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          productId: item.product_id,
          quantity: item.quantity,
      })),
    }));
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
      },
      {
        where: { id: entity.id },
      }
    );
    const updateItems = entity.items.map((item) => OrderItemModel
      .update({
        name: item.name,
        price: item.price,
        quantity: item.quantity
      },
      { where: { id: item.id } }
      ));
      await Promise.all(updateItems);
  }

  async find(id: string): Promise<Order> {
    try{
      const order = await OrderModel.findByPk(id, {
        include: [{ model: OrderItemModel }],
        rejectOnEmpty: true
      });
      return OrderFactory.create({
        id: order.id,
        customerId: order.customer_id,
        items: order.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          productId: item.product_id,
          quantity: item.quantity,
        })),
      });
    } catch (error) {
      throw new Error(`Order with id ${id} not found`);
    }
  }
}
