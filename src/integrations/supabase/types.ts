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
      system_settings: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          key: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          key: string
          updated_at?: string | null
          value: Json
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          key?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
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
      has_role: {
        Args: { _role: Database["public"]["Enums"]["app_role"] }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "operator" | "viewer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "operator", "viewer"],
    },
  },
} as const
