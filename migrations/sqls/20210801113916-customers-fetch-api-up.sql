--CREATE EXTENSION IF NOT EXISTS "uuid-ossp";// this extension is needed to generate uuidv4

drop FUNCTION if exists customer_fetch_api;
 create or replace function customer_fetch_api(
   p_search_string text
   , p_limit integer
   , p_offset integer
   , p_sort_string text
   , p_filter_string text
 )
 returns table (first_name text,
                last_name text,
                company text)
as $$
declare
   v_sort_array text[];
 begin 
   select string_to_array(replace(replace(lower(p_sort_string), 'order by ', ''), ' asc', ''), ',') into v_sort_array;
     return query
     select c.first_name,
            c.last_name,
            c.company
       from public.customers c
       where (p_filter_string IS NULL OR c.company=p_filter_string) and
       1 = case 
         when c.first_name ilike p_search_string then 1
         when c.last_name ilike p_search_string then 1
         else 0 
       end
       order by case trim(v_sort_array[1])
                 when 'first_name' then c.first_name
                 when 'last_name' then c.last_name
                 when 'company' then c.company
               end,
               case trim(v_sort_array[1])
                 when 'first_name desc' then c.first_name
                 when 'last_name desc' then c.last_name
                 when 'company desc' then c.company               
               end desc,
               case trim(v_sort_array[2])
                 when 'first_name' then c.first_name
                 when 'last_name' then c.last_name
                 when 'company' then c.company
               end,
               case trim(v_sort_array[2])
                 when 'first_name desc' then c.first_name
                 when 'last_name desc' then c.last_name
                 when 'company desc' then c.company                
               end desc,
               case trim(v_sort_array[3])
                 when 'first_name' then c.first_name
                 when 'last_name' then c.last_name
                 when 'company' then c.company
               end,
               case trim(v_sort_array[3])
                 when 'first_name desc' then c.first_name
                 when 'last_name desc' then c.last_name
                 when 'company desc' then c.company                
               end desc,
               case trim(v_sort_array[4])
                 when 'first_name' then c.first_name
                 when 'last_name' then c.last_name
                 when 'company' then c.company
               end,
               case trim(v_sort_array[4])
                 when 'first_name desc' then c.first_name
                 when 'last_name desc' then c.last_name
                 when 'company desc' then c.company
               end desc,
               case trim(v_sort_array[5])
                 when 'first_name' then c.first_name
                 when 'last_name' then c.last_name
                 when 'company' then c.company
               end,
               case trim(v_sort_array[5])
                 when 'first_name desc' then c.first_name
                 when 'last_name desc' then c.last_name
                 when 'company desc' then c.company
               end desc              
       limit p_limit
       offset p_offset; 
 end $$
 language plpgsql;