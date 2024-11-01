/**
 * @description: 地区类型定义
 */
declare namespace AreaType {
  // 地区信息
  export interface AreaInfo {
    areaId: number;
    areaName: string;
    children?: AreaInfo[];
  }

  //解析地区信息
  export interface ExplainArea {
    areaCode: string;
    address: string;
    city: string;
    cityCode: string;
    district: string;
    name: string;
    province: string;
  }

  // 城市信息
  export interface CityInfo {
    city?: string;
    cityCode?: number;
    region?: string;
  }
}
