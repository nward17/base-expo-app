import { createClient } from '@supabase/supabase-js';
import * as config from 'config';

const supabaseConfig = config.supabase;
export default createClient(supabaseConfig.host, supabaseConfig.apiKey);
