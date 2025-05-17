export interface ProductItem {
  _id: string;
  title: string;
  description: string;
  img: string;
  price: number;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

  
  export interface UserT {
    _id?: string;
    name?: string;
    email: string;
    password: string;
    image?: string;
    role?: string;
  }
  // export interface ServiceData {
  //   _id: string;
  //   name: string;
  //   email: string;
  //   phone: string;
  //   date: string;
  //   price: string;
  //   address: string;
  //   service_id: string;
  //   service_name: string;
  //   service_price: string;
  //   service_image: string;
  //   created_at: string;
  // };
  export interface BookingData {
    _id: string;
    phone: string;
    date: string;
    price: string;
    address: string;
    service_name: string;
  };
  export interface FormData {
    name: string;
    email: string;
    phone: string;
    date: string;
    price: string;
    address: string;
    created_at: Date;
  };

  export interface ServiceItemWithUser {
    _id: string;
    img: string;
    title: string;
    price: number;
    user: {
      _id: string;
      name: string;
      email: string;
    };
  }
  export type FullComment = {
    _id: string;
    comment: string;
    user: {
      _id: string;
      name: string;
      email?: string;
    };
    product: string;
    createdAt?: string;
    updatedAt?: string;
  };
  
  
  
  
  
  