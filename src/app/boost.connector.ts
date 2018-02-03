export class BoostConnector {


  public static async connect() {
    const nav: any = navigator;

    const device = await nav.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: ['00001623-1212-efde-1623-785feabcd123']
    });
    const server = await device.gatt.connect();
    const service = await server.getPrimaryService('00001623-1212-efde-1623-785feabcd123');
    const characteristics = await service.getCharacteristics();
    const characteristic = characteristics[0];
    return characteristic;
  }
}
