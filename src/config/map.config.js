/*
 * @Author: 王欣磊
 * @Date: 2022-05-30 14:00:50
 * @LastEditors: 王欣磊
 * @LastEditTime: 2022-05-30 14:12:34
 * @Description:
 * @FilePath: /bianjian-ship/src/config/map.config.js
 */
export const mapConfig = {
  gridsetName: 'EPSG:3857',
  gridNames: [
    'EPSG:3857:1',
    'EPSG:3857:2',
    'EPSG:3857:3',
    'EPSG:3857:4',
    'EPSG:3857:5',
    'EPSG:3857:6',
    'EPSG:3857:7',
    'EPSG:3857:8',
    'EPSG:3857:9',
    'EPSG:3857:10',
    'EPSG:3857:11',
    'EPSG:3857:12',
    'EPSG:3857:13',
    'EPSG:3857:14',
    'EPSG:3857:15',
    'EPSG:3857:16'
  ],
  format: 'image/png',
  layerName: 'jiangsu:jiangsuL16',
  resolutions: [
    78271.516953125, 39135.7584765625, 19567.87923828125, 9783.939619140625, 4891.9698095703125, 2445.9849047851562,
    1222.9924523925781, 611.4962261962891, 305.74811309814453, 152.87405654907226, 76.43702827453613,
    38.218514137268066, 19.109257068634033, 9.554628534317017, 4.777314267158508, 2.388657133579254
  ],
  tileSize: [256, 256],
  extent: [-2.003750834e7, -2.003750834e7, 2.003750834e7, 2.003750834e7],
  origin: [-2.003750834e7, 2.003750834e7]
}
