SELECT d.name AS Department, sb.name AS Employee, sb.salary AS Salary
FROM (
    SELECT *, DENSE_RANK() OVER (PARTITION BY departmentId ORDER BY salary DESC) AS rk
    FROM Employee
) sb 
JOIN Department d ON d.id = sb.departmentId
WHERE rk <= 3;