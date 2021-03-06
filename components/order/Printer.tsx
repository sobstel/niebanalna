import React from "react";
import dayjs from "dayjs";
import Money from "../../utils/cents";
import { formatMoney } from "../../utils/accounting";
import config from "../../config";

export class OrderPrinter extends React.PureComponent<{ order: Order }> {
  render() {
    const { number, createdAt, client, items, summary } = this.props.order;

    const printAddress = (address: Address) =>
      config.address &&
      address && (
        <>
          {address.addressLine1}
          <br />
          {address.addressLine2 && (
            <>
              {address.addressLine2}
              <br />
            </>
          )}
          {address.postal} {address.city}
          <br />
          {address.state && <>{address.state},</>}
        </>
      );

    return (
      <div className="invoice-wrap">
        <div className="invoice-box">
          <table cellPadding="0" cellSpacing="0">
            <tbody>
              <tr className="top">
                <td colSpan={2}>
                  <table>
                    <tbody>
                      <tr>
                        <td className="title">
                          <img src="" />
                        </td>

                        <td>
                          Zamówienie nr {number}
                          <br />
                          Data:{" "}
                          {dayjs.unix(createdAt).format("DD-MM-YYYY HH:mm")}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>

              <tr className="information">
                <td colSpan={2}>
                  <table>
                    <tbody>
                      <tr>
                        <td>{config.name}</td>

                        <td>
                          {client.firstname}&nbsp;{client.lastname}
                          <br />
                          tel. {client.phone}
                          <br />
                          {printAddress(client.address)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>

          <table cellPadding={0} cellSpacing={0}>
            <tbody>
              <tr className="heading">
                <td>Nazwa</td>

                <td>Cena jd.</td>

                <td>Ilość</td>

                <td>Wartość</td>
              </tr>

              {items.map((item) => (
                <tr key={`${item.name}`} className="item">
                  <td>{item.name}</td>
                  <td>{formatMoney(Money.cents(item.price))}</td>
                  <td>{item.count}</td>
                  <td>
                    {formatMoney(Money.cents(item.price).times(item.count))}
                  </td>
                </tr>
              ))}

              <tr className="total">
                <td></td>
                <td colSpan={3}>
                  <table>
                    <tbody>
                      <tr>
                        <td>Podsumowanie:</td>
                        <td>{formatMoney(Money.cents(summary.subtotal))}</td>
                      </tr>

                      {!!summary.shipping && (
                        <tr>
                          <td>Dostawa:</td>
                          <td>{formatMoney(Money.cents(summary.shipping))}</td>
                        </tr>
                      )}

                      {!!summary.tax && (
                        <tr>
                          <td>Podatek:</td>
                          <td>{formatMoney(Money.cents(summary.tax))}</td>
                        </tr>
                      )}

                      <tr>
                        <td>Do zapłaty:</td>
                        <td>{formatMoney(Money.cents(summary.total))}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
