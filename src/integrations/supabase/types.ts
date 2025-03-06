export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      documents: {
        Row: {
          client_id: string
          content_type: string | null
          created_at: string
          file_name: string
          file_path: string
          id: string
          title: string
        }
        Insert: {
          client_id: string
          content_type?: string | null
          created_at?: string
          file_name: string
          file_path: string
          id?: string
          title: string
        }
        Update: {
          client_id?: string
          content_type?: string | null
          created_at?: string
          file_name?: string
          file_path?: string
          id?: string
          title?: string
        }
        Relationships: []
      }
      employee_salaries: {
        Row: {
          base_salary: number
          created_at: string | null
          employee_id: string
          id: string
          tax_rate: number | null
          updated_at: string | null
        }
        Insert: {
          base_salary: number
          created_at?: string | null
          employee_id: string
          id?: string
          tax_rate?: number | null
          updated_at?: string | null
        }
        Update: {
          base_salary?: number
          created_at?: string | null
          employee_id?: string
          id?: string
          tax_rate?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          client: string
          created_at: string | null
          delivery_date: string
          formulation: string
          id: string
          project: string
          status: string | null
          volume: number
        }
        Insert: {
          client: string
          created_at?: string | null
          delivery_date: string
          formulation: string
          id: string
          project: string
          status?: string | null
          volume: number
        }
        Update: {
          client?: string
          created_at?: string | null
          delivery_date?: string
          formulation?: string
          id?: string
          project?: string
          status?: string | null
          volume?: number
        }
        Relationships: []
      }
      productions: {
        Row: {
          client: string
          created_at: string | null
          end_date: string | null
          formulation: string
          id: number
          notes: string | null
          order_id: string
          project: string
          start_date: string | null
          status: string | null
          volume: number
        }
        Insert: {
          client: string
          created_at?: string | null
          end_date?: string | null
          formulation: string
          id?: number
          notes?: string | null
          order_id: string
          project: string
          start_date?: string | null
          status?: string | null
          volume: number
        }
        Update: {
          client?: string
          created_at?: string | null
          end_date?: string | null
          formulation?: string
          id?: number
          notes?: string | null
          order_id?: string
          project?: string
          start_date?: string | null
          status?: string | null
          volume?: number
        }
        Relationships: []
      }
      salary_advances: {
        Row: {
          amount: number
          created_at: string | null
          date: string
          description: string | null
          employee_id: string
          id: string
          status: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          date: string
          description?: string | null
          employee_id: string
          id?: string
          status?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          date?: string
          description?: string | null
          employee_id?: string
          id?: string
          status?: string | null
        }
        Relationships: []
      }
      sales_bonuses: {
        Row: {
          bonus_per_cubic_meter: number
          created_at: string | null
          employee_id: string
          id: string
          month: string
          status: string | null
          total_bonus: number
          volume_sold: number
        }
        Insert: {
          bonus_per_cubic_meter: number
          created_at?: string | null
          employee_id: string
          id?: string
          month: string
          status?: string | null
          total_bonus: number
          volume_sold: number
        }
        Update: {
          bonus_per_cubic_meter?: number
          created_at?: string | null
          employee_id?: string
          id?: string
          month?: string
          status?: string | null
          total_bonus?: number
          volume_sold?: number
        }
        Relationships: []
      }
      suppliers: {
        Row: {
          address: string | null
          created_at: string | null
          email: string | null
          id: number
          name: string
          notes: string | null
          phone: string | null
          status: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          id?: number
          name: string
          notes?: string | null
          phone?: string | null
          status?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          id?: number
          name?: string
          notes?: string | null
          phone?: string | null
          status?: string | null
        }
        Relationships: []
      }
      vehicle_documents: {
        Row: {
          created_at: string
          expiry_date: string
          file_path: string | null
          id: string
          status: string | null
          title: string
          type: string
          vehicle_id: string | null
        }
        Insert: {
          created_at?: string
          expiry_date: string
          file_path?: string | null
          id?: string
          status?: string | null
          title: string
          type: string
          vehicle_id?: string | null
        }
        Update: {
          created_at?: string
          expiry_date?: string
          file_path?: string | null
          id?: string
          status?: string | null
          title?: string
          type?: string
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_documents_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_locations: {
        Row: {
          created_at: string
          end_date: string | null
          id: string
          location: string
          start_date: string
          status: string | null
          vehicle_id: string | null
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          id?: string
          location: string
          start_date: string
          status?: string | null
          vehicle_id?: string | null
        }
        Update: {
          created_at?: string
          end_date?: string | null
          id?: string
          location?: string
          start_date?: string
          status?: string | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_locations_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_rentals: {
        Row: {
          client_name: string
          cost: number | null
          created_at: string
          end_date: string | null
          id: string
          notes: string | null
          start_date: string
          status: string | null
          vehicle_id: string | null
        }
        Insert: {
          client_name: string
          cost?: number | null
          created_at?: string
          end_date?: string | null
          id?: string
          notes?: string | null
          start_date: string
          status?: string | null
          vehicle_id?: string | null
        }
        Update: {
          client_name?: string
          cost?: number | null
          created_at?: string
          end_date?: string | null
          id?: string
          notes?: string | null
          start_date?: string
          status?: string | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_rentals_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicles: {
        Row: {
          brand: string
          created_at: string
          id: string
          license_plate: string
          model: string
          status: string | null
          type: string
          year: string
        }
        Insert: {
          brand: string
          created_at?: string
          id?: string
          license_plate: string
          model: string
          status?: string | null
          type: string
          year: string
        }
        Update: {
          brand?: string
          created_at?: string
          id?: string
          license_plate?: string
          model?: string
          status?: string | null
          type?: string
          year?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
