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
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      admin_login_otp: {
        Row: {
          attempt_count: number
          code_hash: string
          consumed_at: string | null
          created_at: string
          expires_at: string
          id: string
          profile_id: string
        }
        Insert: {
          attempt_count?: number
          code_hash: string
          consumed_at?: string | null
          created_at?: string
          expires_at: string
          id?: string
          profile_id: string
        }
        Update: {
          attempt_count?: number
          code_hash?: string
          consumed_at?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_login_otp_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      application_status_history: {
        Row: {
          application_id: string
          changed_by: string | null
          created_at: string
          id: string
          new_status: Database["public"]["Enums"]["application_status"]
          note: string | null
          previous_status:
            | Database["public"]["Enums"]["application_status"]
            | null
        }
        Insert: {
          application_id: string
          changed_by?: string | null
          created_at?: string
          id?: string
          new_status: Database["public"]["Enums"]["application_status"]
          note?: string | null
          previous_status?:
            | Database["public"]["Enums"]["application_status"]
            | null
        }
        Update: {
          application_id?: string
          changed_by?: string | null
          created_at?: string
          id?: string
          new_status?: Database["public"]["Enums"]["application_status"]
          note?: string | null
          previous_status?:
            | Database["public"]["Enums"]["application_status"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "application_status_history_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "partner_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "application_status_history_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
          new_data: Json | null
          old_data: Json | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          new_data?: Json | null
          old_data?: Json | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          new_data?: Json | null
          old_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      commission_payments: {
        Row: {
          commission_id: string
          created_at: string
          created_by: string | null
          id: string
          note: string | null
          paid_at: string
          payment_method: string | null
          payment_reference: string | null
        }
        Insert: {
          commission_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          note?: string | null
          paid_at?: string
          payment_method?: string | null
          payment_reference?: string | null
        }
        Update: {
          commission_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          note?: string | null
          paid_at?: string
          payment_method?: string | null
          payment_reference?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "commission_payments_commission_id_fkey"
            columns: ["commission_id"]
            isOneToOne: false
            referencedRelation: "commissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commission_payments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      commission_rules: {
        Row: {
          commission_type: Database["public"]["Enums"]["commission_type"]
          commission_value: number
          created_at: string
          created_by: string | null
          description: string | null
          end_date: string | null
          id: string
          is_active: boolean
          maximum_sale_amount: number | null
          minimum_sale_amount: number | null
          name: string
          package_id: string | null
          partner_id: string | null
          service_id: string | null
          start_date: string | null
          updated_at: string
        }
        Insert: {
          commission_type: Database["public"]["Enums"]["commission_type"]
          commission_value: number
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean
          maximum_sale_amount?: number | null
          minimum_sale_amount?: number | null
          name: string
          package_id?: string | null
          partner_id?: string | null
          service_id?: string | null
          start_date?: string | null
          updated_at?: string
        }
        Update: {
          commission_type?: Database["public"]["Enums"]["commission_type"]
          commission_value?: number
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean
          maximum_sale_amount?: number | null
          minimum_sale_amount?: number | null
          name?: string
          package_id?: string | null
          partner_id?: string | null
          service_id?: string | null
          start_date?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "commission_rules_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commission_rules_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commission_rules_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commission_rules_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      commission_status_history: {
        Row: {
          changed_by: string | null
          commission_id: string
          created_at: string
          id: string
          new_status: Database["public"]["Enums"]["commission_status"]
          previous_status:
            | Database["public"]["Enums"]["commission_status"]
            | null
        }
        Insert: {
          changed_by?: string | null
          commission_id: string
          created_at?: string
          id?: string
          new_status: Database["public"]["Enums"]["commission_status"]
          previous_status?:
            | Database["public"]["Enums"]["commission_status"]
            | null
        }
        Update: {
          changed_by?: string | null
          commission_id?: string
          created_at?: string
          id?: string
          new_status?: Database["public"]["Enums"]["commission_status"]
          previous_status?:
            | Database["public"]["Enums"]["commission_status"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "commission_status_history_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commission_status_history_commission_id_fkey"
            columns: ["commission_id"]
            isOneToOne: false
            referencedRelation: "commissions"
            referencedColumns: ["id"]
          },
        ]
      }
      commissions: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          base_amount: number
          calculated_at: string
          commission_amount: number
          commission_type: Database["public"]["Enums"]["commission_type"]
          commission_value: number
          created_at: string
          id: string
          paid_at: string | null
          partner_id: string
          rule_id: string | null
          sale_id: string
          status: Database["public"]["Enums"]["commission_status"]
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          base_amount: number
          calculated_at?: string
          commission_amount: number
          commission_type: Database["public"]["Enums"]["commission_type"]
          commission_value: number
          created_at?: string
          id?: string
          paid_at?: string | null
          partner_id: string
          rule_id?: string | null
          sale_id: string
          status?: Database["public"]["Enums"]["commission_status"]
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          base_amount?: number
          calculated_at?: string
          commission_amount?: number
          commission_type?: Database["public"]["Enums"]["commission_type"]
          commission_value?: number
          created_at?: string
          id?: string
          paid_at?: string | null
          partner_id?: string
          rule_id?: string | null
          sale_id?: string
          status?: Database["public"]["Enums"]["commission_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "commissions_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "commission_rules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: true
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
        ]
      }
      email_log: {
        Row: {
          created_at: string
          id: string
          related_entity_id: string | null
          related_entity_type: string | null
          resend_id: string | null
          sent_by: string | null
          status: string
          template: string
          to_email: string
        }
        Insert: {
          created_at?: string
          id?: string
          related_entity_id?: string | null
          related_entity_type?: string | null
          resend_id?: string | null
          sent_by?: string | null
          status?: string
          template: string
          to_email: string
        }
        Update: {
          created_at?: string
          id?: string
          related_entity_id?: string | null
          related_entity_type?: string | null
          resend_id?: string | null
          sent_by?: string | null
          status?: string
          template?: string
          to_email?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_log_sent_by_fkey"
            columns: ["sent_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_status_history: {
        Row: {
          changed_by: string | null
          created_at: string
          id: string
          lead_id: string
          new_status: Database["public"]["Enums"]["lead_status"]
          previous_status: Database["public"]["Enums"]["lead_status"] | null
        }
        Insert: {
          changed_by?: string | null
          created_at?: string
          id?: string
          lead_id: string
          new_status: Database["public"]["Enums"]["lead_status"]
          previous_status?: Database["public"]["Enums"]["lead_status"] | null
        }
        Update: {
          changed_by?: string | null
          created_at?: string
          id?: string
          lead_id?: string
          new_status?: Database["public"]["Enums"]["lead_status"]
          previous_status?: Database["public"]["Enums"]["lead_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_status_history_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_status_history_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          city: string | null
          company_name: string | null
          contact_name: string
          created_at: string
          description: string | null
          district: string | null
          email: string | null
          estimated_budget: number | null
          id: string
          notes: string | null
          package_id: string | null
          partner_id: string
          phone: string
          ref_partner_code: string | null
          sector: string | null
          service_id: string | null
          source: string
          status: Database["public"]["Enums"]["lead_status"]
          updated_at: string
        }
        Insert: {
          city?: string | null
          company_name?: string | null
          contact_name: string
          created_at?: string
          description?: string | null
          district?: string | null
          email?: string | null
          estimated_budget?: number | null
          id?: string
          notes?: string | null
          package_id?: string | null
          partner_id: string
          phone: string
          ref_partner_code?: string | null
          sector?: string | null
          service_id?: string | null
          source?: string
          status?: Database["public"]["Enums"]["lead_status"]
          updated_at?: string
        }
        Update: {
          city?: string | null
          company_name?: string | null
          contact_name?: string
          created_at?: string
          description?: string | null
          district?: string | null
          email?: string | null
          estimated_budget?: number | null
          id?: string
          notes?: string | null
          package_id?: string | null
          partner_id?: string
          phone?: string
          ref_partner_code?: string | null
          sector?: string | null
          service_id?: string | null
          source?: string
          status?: Database["public"]["Enums"]["lead_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "leads_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      marketing_materials: {
        Row: {
          active: boolean
          content: string | null
          created_at: string
          description: string | null
          display_order: number
          file_url: string | null
          id: string
          material_type: string
          title: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          content?: string | null
          created_at?: string
          description?: string | null
          display_order?: number
          file_url?: string | null
          id?: string
          material_type: string
          title: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          content?: string | null
          created_at?: string
          description?: string | null
          display_order?: number
          file_url?: string | null
          id?: string
          material_type?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          id: string
          is_read: boolean
          metadata: Json
          profile_id: string
          title: string
          type: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          metadata?: Json
          profile_id: string
          title: string
          type: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          metadata?: Json
          profile_id?: string
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      packages: {
        Row: {
          active: boolean
          created_at: string
          currency: string
          description: string | null
          display_order: number
          id: string
          name: string
          price: number | null
          service_id: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          currency?: string
          description?: string | null
          display_order?: number
          id?: string
          name: string
          price?: number | null
          service_id: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          currency?: string
          description?: string | null
          display_order?: number
          id?: string
          name?: string
          price?: number | null
          service_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "packages_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_applications: {
        Row: {
          application_data: Json
          created_at: string
          decision_reason: string | null
          id: string
          profile_id: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["application_status"]
          submitted_at: string
          updated_at: string
        }
        Insert: {
          application_data?: Json
          created_at?: string
          decision_reason?: string | null
          id?: string
          profile_id: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          submitted_at?: string
          updated_at?: string
        }
        Update: {
          application_data?: Json
          created_at?: string
          decision_reason?: string | null
          id?: string
          profile_id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          submitted_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "partner_applications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_applications_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_notes: {
        Row: {
          application_id: string | null
          author_id: string | null
          created_at: string
          id: string
          note: string
          partner_id: string | null
        }
        Insert: {
          application_id?: string | null
          author_id?: string | null
          created_at?: string
          id?: string
          note: string
          partner_id?: string | null
        }
        Update: {
          application_id?: string | null
          author_id?: string | null
          created_at?: string
          id?: string
          note?: string
          partner_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "partner_notes_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "partner_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_notes_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_notes_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          application_id: string | null
          approved_at: string | null
          approved_by: string | null
          created_at: string
          id: string
          partner_code: string
          profile_id: string
          status: Database["public"]["Enums"]["partner_status"]
          suspended_at: string | null
          updated_at: string
        }
        Insert: {
          application_id?: string | null
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          id?: string
          partner_code: string
          profile_id: string
          status?: Database["public"]["Enums"]["partner_status"]
          suspended_at?: string | null
          updated_at?: string
        }
        Update: {
          application_id?: string | null
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          id?: string
          partner_code?: string
          profile_id?: string
          status?: Database["public"]["Enums"]["partner_status"]
          suspended_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "partners_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "partner_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partners_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partners_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          status: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          status?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      sale_status_history: {
        Row: {
          changed_by: string | null
          created_at: string
          id: string
          new_status: Database["public"]["Enums"]["sale_status"]
          previous_status: Database["public"]["Enums"]["sale_status"] | null
          sale_id: string
        }
        Insert: {
          changed_by?: string | null
          created_at?: string
          id?: string
          new_status: Database["public"]["Enums"]["sale_status"]
          previous_status?: Database["public"]["Enums"]["sale_status"] | null
          sale_id: string
        }
        Update: {
          changed_by?: string | null
          created_at?: string
          id?: string
          new_status?: Database["public"]["Enums"]["sale_status"]
          previous_status?: Database["public"]["Enums"]["sale_status"] | null
          sale_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sale_status_history_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_status_history_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
        ]
      }
      sales: {
        Row: {
          amount: number
          completed_at: string | null
          confirmed_at: string | null
          created_at: string
          created_by: string | null
          currency: string
          id: string
          lead_id: string | null
          package_id: string | null
          partner_id: string
          payment_status: Database["public"]["Enums"]["payment_status"]
          sale_status: Database["public"]["Enums"]["sale_status"]
          service_id: string
          sold_at: string
          updated_at: string
        }
        Insert: {
          amount: number
          completed_at?: string | null
          confirmed_at?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string
          id?: string
          lead_id?: string | null
          package_id?: string | null
          partner_id: string
          payment_status?: Database["public"]["Enums"]["payment_status"]
          sale_status?: Database["public"]["Enums"]["sale_status"]
          service_id: string
          sold_at?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          completed_at?: string | null
          confirmed_at?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string
          id?: string
          lead_id?: string | null
          package_id?: string | null
          partner_id?: string
          payment_status?: Database["public"]["Enums"]["payment_status"]
          sale_status?: Database["public"]["Enums"]["sale_status"]
          service_id?: string
          sold_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sales_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          active: boolean
          category: string | null
          created_at: string
          description: string | null
          display_order: number
          id: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          category?: string | null
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          category?: string | null
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      current_partner_id: { Args: never; Returns: string }
      is_admin: { Args: never; Returns: boolean }
      is_reviewer_or_admin: { Args: never; Returns: boolean }
      percentage_value_in_range: {
        Args: { t: Database["public"]["Enums"]["commission_type"]; v: number }
        Returns: boolean
      }
    }
    Enums: {
      application_status:
        | "pending"
        | "reviewing"
        | "interview"
        | "approved"
        | "rejected"
        | "cancelled"
      commission_status:
        | "pending"
        | "calculated"
        | "approved"
        | "payable"
        | "paid"
        | "cancelled"
        | "reversed"
      commission_type: "percentage" | "fixed"
      lead_status:
        | "new"
        | "contacted"
        | "qualified"
        | "proposal"
        | "negotiation"
        | "won"
        | "lost"
        | "cancelled"
        | "duplicate"
      partner_status:
        | "pending"
        | "active"
        | "suspended"
        | "inactive"
        | "rejected"
      payment_status: "unpaid" | "partial" | "paid" | "refunded"
      sale_status:
        | "pending"
        | "confirmed"
        | "cancelled"
        | "refunded"
        | "completed"
      user_role: "admin" | "reviewer" | "partner" | "user"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      application_status: [
        "pending",
        "reviewing",
        "interview",
        "approved",
        "rejected",
        "cancelled",
      ],
      commission_status: [
        "pending",
        "calculated",
        "approved",
        "payable",
        "paid",
        "cancelled",
        "reversed",
      ],
      commission_type: ["percentage", "fixed"],
      lead_status: [
        "new",
        "contacted",
        "qualified",
        "proposal",
        "negotiation",
        "won",
        "lost",
        "cancelled",
        "duplicate",
      ],
      partner_status: [
        "pending",
        "active",
        "suspended",
        "inactive",
        "rejected",
      ],
      payment_status: ["unpaid", "partial", "paid", "refunded"],
      sale_status: [
        "pending",
        "confirmed",
        "cancelled",
        "refunded",
        "completed",
      ],
      user_role: ["admin", "reviewer", "partner", "user"],
    },
  },
} as const
