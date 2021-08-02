/* Replace with your SQL commands */
drop FUNCTION if exists fetch_unique_companies_api;
 create or replace function fetch_unique_companies_api()
 returns table (company text)
 language sql security definer
as $$
  select distinct c.company  from customers c;
$$;