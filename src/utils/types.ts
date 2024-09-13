export interface user {
 id: number;
 name: string;
 email: string;
};
   
export interface product {
 id: number;
 title: string;
 price: number;
 description: string;
 image: string;
 rating: number;
 type: "watch" | "mobile" | "clothes";
 category: "wish"  | "order" | "history";
 quantity: number;
};