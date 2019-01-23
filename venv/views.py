

# select idPair, idex as idex1, max(price) as max
# from dataPrice
# group by pair
#

# select idPair, idex as idex2, min(price) as min
# from dataPrice
# group by pair

# select idPair, idex, (max - min) as diff
# from A /\ B
# group by pair