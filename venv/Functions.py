import ccxt
import datetime
from dataBase import *
########################################################################################################################
# Conecting to exchange
binance = ccxt.binance()
okex = ccxt.okex()
bitz = ccxt.bitz()
huobi = ccxt.huobipro()
zb = ccxt.zb()
lbank = ccxt.lbank()
hitbtc = ccxt.hitbtc()
bitforex = ccxt.bitforex()
bitfinex = ccxt.bitfinex()
kraken = ccxt.kraken()
kucoin = ccxt.kucoin()
poloniex = ccxt.poloniex()
########################################################################################################################
#Include the list of exchange and pairs needed
exchangeList = [binance, okex,bitz, huobi, zb, lbank, hitbtc, bitforex, bitfinex, kraken, kucoin, poloniex]
pairList = ['BTC/USDT', 'ETH/USDT', 'TRX/USDT', 'ETH/BTC', 'XRP/USDT', 'XRP/BTC', 'LTC/BTC', 'LTC/USDT', 'NEO/BTC', 'XLM/USDT']
########################################################################################################################
# Module GetData
# Brief : Get all the pair and their pricing for each exchange
# 1 param : List of exchanges
# 2 param : List of pairs
# returns : A dictinary contianin every exchange with the price of their own pairs
def GetData (exList, pairsList):
    createTables()
    dict = {}
    #1 For each exchange from the list
    for exchange in exList:

        #1.1 Create a dictionary temporaly
        temp = {exchange.id: {}}
        print('conneted to ' + exchange.id)
        try:
            #1.2 For each pair in the list of pairs
            for pair in pairsList:
                #1.2.1 If the pair exist save it to the dict
                try:
                    #1.2.1.1 Save it to the dict
                    temp[exchange.id].update({pair : exchange.fetch_ticker(pair)["close"]})
                    dict = {**dict, **temp}
                    print(exchange.id + " " + pair )

                #1.2.2Else
                except Exception:
                    #1.2.2.2 Ignore it
                    pass
        except:
            pass
    #2 Return dictionary
    print(dict)
    return dict
########################################################################################################################
# Module SaveData
# Brief : Save the new data to the database (postgresql)
# 1 param : Exchance dictionary
# returns : void
def SaveData (dict):
    dropTables()
    createTables()
    #1 For each exchange from the list
    for exchange in dict:
        #1.2 For each pair in the exchange
        for pair in dict[exchange]:
            #1.2.1.1 Save it to the database
            time = datetime.datetime.now()
            insertPriceData(exchange, pair, str(time), dict[exchange][pair])

########################################################################################################################
def getPairsList(exchange):
    pairList = []
    pairCount = len(exchange.load_markets())
    for pair in range(pairCount):
        pairList.append(exchange.load_markets().popitem()[0])
    return pairList


def getExchangeList():
    return ccxt.exchanges

# print(getExchangeList())
def pairFilter(list):
    newList = []
    for pair in list:
        count = 0
        for pair2 in newList:
            if(pair2 == pair):
                count = count + 1
        if(count == 0):
            newList.append(pair)
    return newList


def getAllPair(exchangeList):
    list = []
    for exchange in exchangeList:
        try:
            pairs = getPairsList(getattr(ccxt, exchange)())
            for pair in pairs:
                list.append(pair)
        except Exception:
            pass
    # Filter
    return pairFilter(list)

print(getExchangeList())
