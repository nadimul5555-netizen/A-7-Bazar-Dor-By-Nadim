export interface CategoryType
 {
    "id": string,
    "slug": string,
    "nameBn": string,
    "icon": "🥬"
  }

  export interface BazarType {
      
        "market": string,
        "division": string,
        "min": number,
        "max": number,
      
  }
  export interface Change{
      "dir": string,
      "pct": number,
  }

  export interface PonnoType 
  
  {
    "id": number,
    "slug": string,
    "nameBn": string,
    "category": string,
    "categoryNameBn": string,
    "categoryIcon": "🍚",
    "unit": string,
    "image": "🍚",
    "today": number,
    "yesterday": number,
    "lastWeek": number,
    "lastMonth": number,
    "change": Change,
    "markets":  BazarType[],
  }
export interface ParamsType{
  id:string,
}