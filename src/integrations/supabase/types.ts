export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          id: string
          ip: string | null
          level: string
          target: string | null
          user_agent: string | null
          user_email: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          id?: string
          ip?: string | null
          level?: string
          target?: string | null
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          id?: string
          ip?: string | null
          level?: string
          target?: string | null
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      cart_items: {
        Row: {
          billing_cycle: string
          cpu: string | null
          created_at: string
          id: string
          plan_name: string
          plan_type: string
          price: number
          quantity: number
          ram: string | null
          storage: string | null
          user_id: string
        }
        Insert: {
          billing_cycle?: string
          cpu?: string | null
          created_at?: string
          id?: string
          plan_name: string
          plan_type: string
          price: number
          quantity?: number
          ram?: string | null
          storage?: string | null
          user_id: string
        }
        Update: {
          billing_cycle?: string
          cpu?: string | null
          created_at?: string
          id?: string
          plan_name?: string
          plan_type?: string
          price?: number
          quantity?: number
          ram?: string | null
          storage?: string | null
          user_id?: string
        }
        Relationships: []
      }
      free_panel_claims: {
        Row: {
          cpu_pct: number
          created_at: string
          disk_mb: number
          error_message: string | null
          expires_at: string | null
          id: string
          panel_password: string | null
          panel_server_id: number | null
          panel_server_identifier: string | null
          panel_url: string
          panel_user_id: number | null
          panel_username: string | null
          ram_mb: number
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          cpu_pct?: number
          created_at?: string
          disk_mb?: number
          error_message?: string | null
          expires_at?: string | null
          id?: string
          panel_password?: string | null
          panel_server_id?: number | null
          panel_server_identifier?: string | null
          panel_url: string
          panel_user_id?: number | null
          panel_username?: string | null
          ram_mb?: number
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          cpu_pct?: number
          created_at?: string
          disk_mb?: number
          error_message?: string | null
          expires_at?: string | null
          id?: string
          panel_password?: string | null
          panel_server_id?: number | null
          panel_server_identifier?: string | null
          panel_url?: string
          panel_user_id?: number | null
          panel_username?: string | null
          ram_mb?: number
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      free_panel_settings: {
        Row: {
          daily_quota: number
          enabled: boolean
          expiry_days: number
          id: number
          min_account_age_hours: number
          per_user_limit: number
          updated_at: string
        }
        Insert: {
          daily_quota?: number
          enabled?: boolean
          expiry_days?: number
          id?: number
          min_account_age_hours?: number
          per_user_limit?: number
          updated_at?: string
        }
        Update: {
          daily_quota?: number
          enabled?: boolean
          expiry_days?: number
          id?: number
          min_account_age_hours?: number
          per_user_limit?: number
          updated_at?: string
        }
        Relationships: []
      }
      invoices: {
        Row: {
          amount: number
          created_at: string
          discount: number
          due_date: string | null
          id: string
          invoice_number: string
          items: Json
          paid_at: string | null
          service_id: string | null
          status: string
          total: number
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          discount?: number
          due_date?: string | null
          id?: string
          invoice_number?: string
          items?: Json
          paid_at?: string | null
          service_id?: string | null
          status?: string
          total: number
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          discount?: number
          due_date?: string | null
          id?: string
          invoice_number?: string
          items?: Json
          paid_at?: string | null
          service_id?: string | null
          status?: string
          total?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      kb_articles: {
        Row: {
          category: string
          content: string
          created_at: string
          excerpt: string | null
          id: string
          published: boolean
          slug: string
          title: string
          updated_at: string
          views: number
        }
        Insert: {
          category?: string
          content: string
          created_at?: string
          excerpt?: string | null
          id?: string
          published?: boolean
          slug: string
          title: string
          updated_at?: string
          views?: number
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          id?: string
          published?: boolean
          slug?: string
          title?: string
          updated_at?: string
          views?: number
        }
        Relationships: []
      }
      page_sections: {
        Row: {
          body: string | null
          created_at: string
          cta_href: string | null
          cta_label: string | null
          eyebrow: string | null
          heading: string | null
          id: string
          image_url: string | null
          is_visible: boolean
          items: Json
          page: string
          sort_order: number
          subheading: string | null
          type: string
          updated_at: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          cta_href?: string | null
          cta_label?: string | null
          eyebrow?: string | null
          heading?: string | null
          id?: string
          image_url?: string | null
          is_visible?: boolean
          items?: Json
          page?: string
          sort_order?: number
          subheading?: string | null
          type: string
          updated_at?: string
        }
        Update: {
          body?: string | null
          created_at?: string
          cta_href?: string | null
          cta_label?: string | null
          eyebrow?: string | null
          heading?: string | null
          id?: string
          image_url?: string | null
          is_visible?: boolean
          items?: Json
          page?: string
          sort_order?: number
          subheading?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      product_categories: {
        Row: {
          created_at: string
          description: string | null
          icon: string
          id: string
          image_url: string | null
          is_active: boolean
          kind: string
          name: string
          rate_label: string | null
          slug: string
          sort_order: number
          tagline: string | null
          tone: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          kind?: string
          name: string
          rate_label?: string | null
          slug: string
          sort_order?: number
          tagline?: string | null
          tone?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          kind?: string
          name?: string
          rate_label?: string | null
          slug?: string
          sort_order?: number
          tagline?: string | null
          tone?: string
          updated_at?: string
        }
        Relationships: []
      }
      product_plans: {
        Row: {
          bandwidth: string | null
          billing_cycle: string
          category_id: string
          cpu: string | null
          created_at: string
          currency: string
          features: Json
          icon: string
          id: string
          is_active: boolean
          is_popular: boolean
          name: string
          price: number
          ram: string | null
          sort_order: number
          storage: string | null
          updated_at: string
        }
        Insert: {
          bandwidth?: string | null
          billing_cycle?: string
          category_id: string
          cpu?: string | null
          created_at?: string
          currency?: string
          features?: Json
          icon?: string
          id?: string
          is_active?: boolean
          is_popular?: boolean
          name: string
          price?: number
          ram?: string | null
          sort_order?: number
          storage?: string | null
          updated_at?: string
        }
        Update: {
          bandwidth?: string | null
          billing_cycle?: string
          category_id?: string
          cpu?: string | null
          created_at?: string
          currency?: string
          features?: Json
          icon?: string
          id?: string
          is_active?: boolean
          is_popular?: boolean
          name?: string
          price?: number
          ram?: string | null
          sort_order?: number
          storage?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_plans_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          balance: number
          created_at: string
          display_name: string | null
          id: string
          referral_code: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          balance?: number
          created_at?: string
          display_name?: string | null
          id?: string
          referral_code?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          balance?: number
          created_at?: string
          display_name?: string | null
          id?: string
          referral_code?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      promo_codes: {
        Row: {
          active: boolean
          code: string
          created_at: string
          description: string | null
          discount_percent: number
          expires_at: string | null
          id: string
          max_uses: number | null
          used_count: number
        }
        Insert: {
          active?: boolean
          code: string
          created_at?: string
          description?: string | null
          discount_percent?: number
          expires_at?: string | null
          id?: string
          max_uses?: number | null
          used_count?: number
        }
        Update: {
          active?: boolean
          code?: string
          created_at?: string
          description?: string | null
          discount_percent?: number
          expires_at?: string | null
          id?: string
          max_uses?: number | null
          used_count?: number
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string
          created_at: string
          id: string
          is_approved: boolean
          rating: number
          updated_at: string
          user_id: string | null
          username: string
        }
        Insert: {
          comment: string
          created_at?: string
          id?: string
          is_approved?: boolean
          rating: number
          updated_at?: string
          user_id?: string | null
          username: string
        }
        Update: {
          comment?: string
          created_at?: string
          id?: string
          is_approved?: boolean
          rating?: number
          updated_at?: string
          user_id?: string | null
          username?: string
        }
        Relationships: []
      }
      service_status: {
        Row: {
          created_at: string
          id: string
          message: string | null
          name: string
          sort_order: number
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          message?: string | null
          name: string
          sort_order?: number
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string | null
          name?: string
          sort_order?: number
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          auto_renew: boolean
          auto_renew_cycle_months: number
          cpu: string | null
          created_at: string
          expires_at: string | null
          id: string
          ip_address: string | null
          last_auto_renew_at: string | null
          last_auto_renew_status: string | null
          location: string | null
          panel_password: string | null
          panel_server_id: number | null
          panel_server_identifier: string | null
          panel_type: string | null
          panel_url: string | null
          panel_user_id: number | null
          panel_username: string | null
          plan_name: string
          plan_type: string
          price: number
          provisioned_at: string | null
          ram: string | null
          reminder_1d_sent_at: string | null
          reminder_3d_sent_at: string | null
          reminder_7d_sent_at: string | null
          status: string
          storage: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          auto_renew?: boolean
          auto_renew_cycle_months?: number
          cpu?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          ip_address?: string | null
          last_auto_renew_at?: string | null
          last_auto_renew_status?: string | null
          location?: string | null
          panel_password?: string | null
          panel_server_id?: number | null
          panel_server_identifier?: string | null
          panel_type?: string | null
          panel_url?: string | null
          panel_user_id?: number | null
          panel_username?: string | null
          plan_name: string
          plan_type: string
          price: number
          provisioned_at?: string | null
          ram?: string | null
          reminder_1d_sent_at?: string | null
          reminder_3d_sent_at?: string | null
          reminder_7d_sent_at?: string | null
          status?: string
          storage?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          auto_renew?: boolean
          auto_renew_cycle_months?: number
          cpu?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          ip_address?: string | null
          last_auto_renew_at?: string | null
          last_auto_renew_status?: string | null
          location?: string | null
          panel_password?: string | null
          panel_server_id?: number | null
          panel_server_identifier?: string | null
          panel_type?: string | null
          panel_url?: string | null
          panel_user_id?: number | null
          panel_username?: string | null
          plan_name?: string
          plan_type?: string
          price?: number
          provisioned_at?: string | null
          ram?: string | null
          reminder_1d_sent_at?: string | null
          reminder_3d_sent_at?: string | null
          reminder_7d_sent_at?: string | null
          status?: string
          storage?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          category: string
          created_at: string
          id: string
          priority: string
          status: string
          subject: string
          ticket_number: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string
          created_at?: string
          id?: string
          priority?: string
          status?: string
          subject: string
          ticket_number?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          priority?: string
          status?: string
          subject?: string
          ticket_number?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ticket_messages: {
        Row: {
          created_at: string
          id: string
          is_staff: boolean
          message: string
          ticket_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_staff?: boolean
          message: string
          ticket_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_staff?: boolean
          message?: string
          ticket_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          id: string
          invoice_id: string | null
          type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          id?: string
          invoice_id?: string | null
          type?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          id?: string
          invoice_id?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_homepage_stats: { Args: never; Returns: Json }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
