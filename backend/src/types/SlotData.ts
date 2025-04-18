export interface SlotTypee {
    id:number;
    type_name:string
    price:number
}
export interface SlotTime {
    time:string;
    slot_id:number;
}
export interface Theaters  {
  id: number;
  theater_name: string;
  theater_type: string;
  theater_address: string;
  slots: {
    slotType: SlotTypee;
    slot_times: SlotTime[];
  }[];
};

export interface DayTheaterData {
  day: string;
  theaters: Theaters[];
}
export interface City{
    city_id:number;
    city_name:string;
    days:DayTheaterData[];
}

export interface Movie {
  movie: {
    movie_id: number;
    movie_title: string;
    movie_duration: string;
    movie_genere: string;
    movie_poster: string;
    movie_director: string;
    movie_rating: string;
    cities: City[]; // Adjust if you have a specific type for cities
  };
}
export interface MovieData{
    data:{
        movie:Movie[];
    }
}