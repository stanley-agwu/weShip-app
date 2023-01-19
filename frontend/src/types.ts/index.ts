export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  comfirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
}

export interface ILoginFormData {
  email: string;
  password: string;
  showPassword: boolean;
}

export type LoggedInUser = {
  _id: string,
  username: string,
  email: string,
  createdAt: string,
  updatedAt: string,
  token?: string,
}

export interface IAuthState {
  user: LoggedInUser | null;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export type Delivery = {
  createdAt?: string;
  updatedAt?: string;
  user_id?: string;
  _id?: string;
  customerName: string;
  warehouseAddressLat: string;
  warehouseAddressLng: string;
  deliveryDate: string;
  deliveryAddressLat: string;
  deliveryAddressLng: string;
}
export interface IDeliveryState {
  deliveries: Delivery[],
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export interface IRegisterUser {
  username: string;
  email: string;
  password: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export type ErrorType = {
  response: {
    data: { 
      message: string;
    }
  }
}
export interface IRootState {
  auth: IAuthState;
  delivery: IDeliveryState,
}

export interface IDeliveryFormData {
  customerName: string;
  warehouseAddress: string;
  deliveryDate: string;
  deliveryAddress: string;
}

export type State = {
  auth: {
    user: {
      token: string;
    }
  }
}

export type MapTileProps = {
  lat: string;
  lng: string;
}

export type LocationProps = {
  deliveryData: Delivery
}