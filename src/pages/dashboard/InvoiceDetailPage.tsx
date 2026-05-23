import { useEffect, useState } from "react";
import { useParams, Link } from "https://esm.sh/react-router-dom@6";
import { ArrowLeft, MessageCircle, Printer } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { DISCORD_INVITE } from "@/data/plans";
